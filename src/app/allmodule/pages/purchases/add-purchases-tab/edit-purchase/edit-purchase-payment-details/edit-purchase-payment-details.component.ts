import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';

import { PurchaseDataService } from 'src/app/allmodule/services/data_services/purchase-data.service';
import { Constants } from 'src/app/app.constants';
export interface fileUploadData {
  file: File | null;
  documentTypes: number;
  purchaseId: number;

}
@Component({
  selector: 'app-edit-purchase-payment-details',
  templateUrl: './edit-purchase-payment-details.component.html',
  styleUrls: ['./edit-purchase-payment-details.component.css']
})
export class EditPurchasePaymentDetailsComponent implements OnInit {
  templatePayments: any[] = [];
  deletedPayments: any[] = [];
  productDetails: any;
  paymentDetails:any;
  submitted = false;
  purchaseId=0;
  totalPaying: number = 0;
  selectedFile: File | null = null;
  fileCount: number = 0;
  allCustomer:any[]=[];
  totalPaid = 0;
  changeReturn: number = 0; // Initialize changeReturn
  balance: number = 0; // Initialize balance
  addNewPayment() {
    let date: Date = new Date();
    let dateString: string = date.toISOString().slice(0, 10);
    this.templatePayments.push({
      paymentMethod: 0,
      amount: 0,
      opType:1,
      paymentDate: new Date(dateString)
    });
  }
  editPurchasePaymentDetailsForm!:FormGroup;
  constructor(private router: Router,private activateRouter:ActivatedRoute, private api: PurchasesService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,private dataService:PurchaseDataService) 
    {
      
      this.productDetails = this.dataService.getPurchaseProductDetails();
      this.paymentDetails = this.dataService.getPurchasePaymentDetails();
     }

  ngOnInit(): void {
    this.editPurchasePaymentDetailsForm = this.formBuilder.group({
      amount: [''],

 
    })

    if(this.paymentDetails){
      
      this.templatePayments = this.paymentDetails;
      this.templatePayments.forEach((payment: any)=>{
        payment.paymentDate = this.formatDate(payment.paymentDate); 
      });
      
    }
    
  }

  
  formatDate(inputDate: Date): string {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); 
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  
  sendPaymentDetails(){ 
    
    this.paymentDetails.templatePayments = this.templatePayments;
    this.paymentDetails.deletedPaymentDetails = this.deletedPayments
    this.dataService.setPurchasePaymentDetails(this.paymentDetails);
    this.dataService.setPurchaseProductDetails(this.productDetails)
  }



  onChangeTotalPaying(){  
    
    let totalPaying = Number(this.totalPaying);
      this.changeReturn = Math.max(0, totalPaying - this.productDetails.totalBill);
    this.balance = Math.max(0, this.productDetails.totalBill - totalPaying); 
    }


  calculateTotalPaying(value: any, payment: any) {
    if(value == ''  || value == null ){
      value = 0;
      
    }  
    payment.amount = value   
    if (payment.opType !== 1) {
      payment.opType = 2;
      
    }
    this.totalPaid = this.templatePayments.reduce((total) => total + Number(value), 0);
    
}


removePaymentDiv(index: number) {
    
  let deletedPayment = {
    "paymentId": this.templatePayments[index].paymentId,
    "opType": 3
  };
  
  this.templatePayments.splice(index, 1);
 this.deletedPayments.push(deletedPayment)
 
}

editPurchase(){
  let productDetails: any[] = [];
  if(this.productDetails.templateProducts){
    for(let product of this.productDetails.templateProducts){
      let newProduct = {
          productId: product.productId,
          quantity: product.quantity,
          batchId:product.batchId,
         batchNo:product.batchNo,
         packOf:product.packOf,
         mrpPerPack:product.mrpPerPack,
         expiryDate:product.expiryDate,
          opType: product.opType !== undefined ? product.opType : product.opType 
      };
     
      productDetails.push(newProduct);
  }
  }
  const editPurchaseJson = { 
    supplierId: this.productDetails.supplierId,
    totalBill: this.productDetails.totalBill,
    purchaseDate: this.productDetails.purchaseDate,
    totalPaid: this.totalPaid,
    updatePurchaseProductDetails:[...productDetails,...this.productDetails.deletedProducts],
    updatePurchasePaymentDetails: [...this.templatePayments, ...this.deletedPayments]
  }
  this.submitted = true;
 if(this.editPurchasePaymentDetailsForm.valid){
    this.api.updatePurchases(this.productDetails.purchaseId,editPurchaseJson).subscribe({
      next:(res)=>{
        
        this.deletePurchaseDocuments()
        this.toaster.success(this.constants.SuccessMessages.PURCHASE_UPDATED_MESSAGE)
            this.router.navigate(['/add-purchases-tab'])
      },
      error:(error)=> {   
        
        if(error.error.error){
        if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_ID_CAN_NOT_BE_BlANK_ERROR_CODE){
           this.toaster.error(this.constants.Messages.CUSTOMER_ID_CAN_NOT_BE_BLANK)
        }
       else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_UPDATE_PURCHASE_DATA_ERROR_CODE){
        this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_PURCHASE_MESSAGE)
       }
       else if(error.error.error.code === this.constants.ErrorCodes.PURCHASE_ID_DOES_NOT_EXISTS_ERROR_CODE){
          this.toaster.error(this.constants.Messages.PURCHASE_ID_DOES_NOT_EXISTS_MESSAGE)
        }
    
      else{
        this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_PURCHASE_MESSAGE)
      }
    }
    else{
      this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_PURCHASE_MESSAGE)
    }
    }
    
  })
  }
  
 }
 deletePurchaseDocuments(){
  
  if(this.productDetails.filesToBeDeleted.length>0){
    for(let docId of this.productDetails.filesToBeDeleted){
      
        this.api.deletePurchaseDocuments(docId).subscribe({
           next:(res)=> {
            
           this.uploadDocuments()
          
           }, 
           error(err) {
             
           },
           
        })

    }
  }
  else{
    this.uploadDocuments()
  }
  
}

uploadDocuments(){
 
  if (this.productDetails.files && this.productDetails.files.length > 0) {
    for (const file of this.productDetails.files) {
     
      if(!file.type ){
        continue;
      }
      let doctype =0;
      if(file.type.includes("image"))
      doctype=1;
      if(file.type.includes("pdf"))
      doctype=2
      const fileData: fileUploadData = {
        file: file,
        documentTypes: doctype,
        purchaseId: this.productDetails.purchaseId,
        
      };
       
      this.api.uploadPurchaseDocuments(fileData).subscribe({
        
        next: (res) => {
            
            this.toaster.success(this.constants.SuccessMessages.PURCHASE_UPDATED_MESSAGE)
            this.router.navigate(['/add-purchases-tab'])
          
           
        },
        error: (error) =>{
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.PURCHASE_DOCUMENT_PATH_DOES_NOT_EXISTS_ERROR_CODE){
          this.toaster.error(this.constants.Messages.PURCHASE_DOCUMENT_PATH_DOES_NOT_EXISTS_MESSAGE)
         }
          }
        }
        
      })

    }
  }
  else{

    this.router.navigate(['/add-purchases-tab'])
  }
  
}

}