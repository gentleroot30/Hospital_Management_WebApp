import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-add-purchase-payment-details',
  templateUrl: './add-purchase-payment-details.component.html',
  styleUrls: ['./add-purchase-payment-details.component.css']
})

export class AddPurchasePaymentDetailsComponent implements OnInit {
  createdDivs: any[] = [];
  addPurchasePaymentForm!: FormGroup;
  submitted = false;
  productDetails: any;
  paymentDetailsObject:any;
  files:  any[]=[];
  fileCount: number = 0;
  uploadStatus: string = '';
  upload: string = '';
  file: File | null = null;
  purchaseId:number =0;
  totalPaying: number = 0;
  totalAmount: number = 0;
  totalPaid =0;
  payable: number = 0; // Initialize payable
  changeReturn: number = 0; // Initialize changeReturn
  balance: number = 0; // Initialize balance
  paymentDetails = [
    {
      "recieverName":'',
      "recieverContact":'',
      "paymentMethod": 0,
      "amount": 0,
      "paymentDate": new Date()
    },
    // more payment details here
  ];
  payments: any;


  addNewPayment() {
    let date: Date = new Date();
    let dateString: string = date.toISOString().slice(0, 10);
    this.paymentDetails.push({
      recieverName:'',
      recieverContact:'',
      paymentMethod: 0,
      amount: 0,
      paymentDate: new Date(dateString)
    });
  }
  constructor(private route: Router, private api: PurchasesService, private dataService: PurchaseDataService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder) {
      
     }

    ngOnInit(): void {
      this.addPurchasePaymentForm = this.formBuilder.group({
  
        amount: [''],
        
  
      })
     
      this.productDetails = this.dataService.getPurchaseProductDetails();
    
      this.paymentDetailsObject=this.dataService.getPurchasePaymentDetails();
      if(this.paymentDetailsObject){
        this.paymentDetails = this.paymentDetailsObject;   
      }
  
  
    }
    sendPaymentDetailsMetod(){ 
        this.dataService.setPurchasePaymentDetails(this.paymentDetails);
      }
    
      onChangeTotalPaying(){  
      let totalPaying = Number(this.totalPaying);
        this.changeReturn = Math.max(0, totalPaying - this.productDetails.totalBill);
      this.balance = Math.max(0, this.productDetails.totalBill - totalPaying);
      
      }
  
  
      calculateTotalPaid() {
        this.totalPaid = this.paymentDetails.reduce((total, payment) => total + Number(payment.amount), 0);
      }
      
    removePaymentDiv(index: number) {
      this.paymentDetails.splice(index, 1);
  
    }
  
  
  
    get f() { return this.addPurchasePaymentForm.controls; }

    addNewPurchase(){
      if(this.paymentDetails.length === 0){
        this.toaster.error( "Please Add Payment Details");
      }
      
      let productDetails: any[] = [];
      productDetails=this.productDetails.productDetails;
      const addNewPurchase = {
        supplierId: this.productDetails.supplierId,
        totalBill: this.productDetails.totalBill,
        totalPaid:this.totalPaid,
        purchaseDate: this.productDetails.purchaseDate,
        addProductDetails:productDetails.map(productDetails=>{
          let productId = productDetails.productId
          let quantity = Number (productDetails.purchaseQuantity)
          let batchNo = (productDetails.batchNo)
          let expiryDate = productDetails.expiryDate
          let packOf = Number(productDetails.packOf)
          let mrpPerPack = Number(productDetails.mrpPerPack)
          return {
            productId,
            quantity,
            batchNo,
            expiryDate,
            packOf,
            mrpPerPack
          };
        }),
        addPaymentDetails: this.paymentDetails
      }
      
      this.submitted = true;
      if (this.addPurchasePaymentForm.valid) {
        let purchaseId = 0;
        this.api.addPurchase(addNewPurchase).subscribe({
          next: (res)=>{
            
            if (this.productDetails.files && this.productDetails.files.length > 0) {
              for (const file of (this.productDetails.files)) { 
                purchaseId = res.data.id;
                let doctype =0;
                if(file.type.includes("image"))
                doctype=1;
                if(file.type.includes("pdf"))
                doctype=2
                const fileData: fileUploadData = {
                  file: file,
                  documentTypes: doctype,
                  purchaseId: purchaseId,
                };
                 
                this.api.uploadPurchaseDocuments(fileData).subscribe({
                  next: (res) => {
      
    
                  },
                  error: (error) =>{
                  }
                  
                })
              }
              this.toaster.success(this.constants.SuccessMessages.PURCHASE_SAVED_MESSAGE)
            
              
              this.route.navigate(['/add-purchases-tab'])
            }
           
          },
          error:(error) => {
            if(error.error.error){
              if(error.error.error.code == this.constants.ErrorCodes.SUPPLIER_ID_CAN_NOT_BLANK_ERROR_CODE){
                this.toaster.error(this.constants.Messages.SUPPLIER_ID_CAN_NOT_BE_BLANK)
              }
              else if(error.error.error.code == this.constants.ErrorCodes.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE){
                this.toaster.error(this.constants.Messages.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE)
              }
              else if(error.error.error.code == this.constants.ErrorCodes.FAILED_TO_SAVE_PURCHASE_DATA_ERROR_CODE){
                this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_PURCHASE_MESSAGE)
              }
              else {
                this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_PURCHASE_MESSAGE)
              }
            }
            else{
              this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_PURCHASE_MESSAGE)
            }
        }

        })
    }
}

}