
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-pos-payment-details',
  templateUrl: './edit-pos-payment-details.component.html',
  styleUrls: ['./edit-pos-payment-details.component.css']
})
export class EditPosPaymentDetailsComponent implements OnInit {
  createdDivs: any[] = [];
  editPosPaymentDetailsForm!: FormGroup;
  submitted = false;
  //productDetails: any;
  //paymentDetailsObject:any;

  //templateProducts: any[] = [];
  templatePayments: any[] = [];
  deletedPayments: any[] = [];
  productDetails: any;
  paymentDetails:any;

  totalPaying: number = 0;
  
  totalPaid = 0;
  changeReturn: number = 0; // Initialize changeReturn
  balance: number = 0; // Initialize balance
  // paymentDetails = [
  //   {
      
  //     "paymentMethod": 0,
  //     "amount": 0,
  //     "opType":1,
  //     "paymentDate": new Date()
  //   },
  //   // more payment details here
  // ];

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

  constructor(private route: Router, private api: PosService, private dataService: PosDataService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder)
     { 
      
    this.productDetails = this.dataService.getProductDetails();
    this.paymentDetails = this.dataService.getPaymentDetails();
     }

  ngOnInit(): void {
    this.editPosPaymentDetailsForm = this.formBuilder.group({

      amount: [''],
      

      
    })
    
  
   
    if(this.paymentDetails){
      this.templatePayments = this.paymentDetails.templatePayments;
      this.templatePayments.forEach((payment: any)=>{
        payment.paymentDate = this.formatDate(payment.paymentDate); 
      });
      //this.salesId = this.productDetails.salesId;
    }
   
   
  }

  setPaymentDetails(){ 
    
    this.paymentDetails.templatePayments = this.templatePayments;
    this.paymentDetails.deletedPaymentDetails = this.deletedPayments
    this.dataService.setPaymentDetails(this.paymentDetails);
  }

// For getting paymentdate
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



  onChangeTotalPaying(){  
    
    let totalPaying = Number(this.totalPaying);
      this.changeReturn = Math.max(0, totalPaying - this.productDetails.payable);
    this.balance = Math.max(0, this.productDetails.payable - totalPaying);
    
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
    
    // this.totalPaying -= this.paymentDetails[index].amount;
    this.templatePayments.splice(index, 1);
   this.deletedPayments.push(deletedPayment)
   
  }

  

editPos(){
  
  if(this.templatePayments.length === 0){
    this.toaster.error( "Please Add Payment Details");
  }


  let productDetails: any[] = [];
  if(this.productDetails.templateProducts){
    for(let product of this.productDetails.templateProducts){
        let newProduct = {
            productId: product.productId,
            quantity: product.quantity,
            amount: product.amount,
            batchId: Number(product.selectedBatchId),
            opType: product.opType !== undefined ? product.opType : product.opType 
        };
        productDetails.push(newProduct);
    }
}

  

    const editPosJson = {
      customerId: this.productDetails.customerId,
      totalBill: this.productDetails.payable,
      posDate: this.productDetails.posDate,
      totalPaid: this.totalPaid,
      productDetails:[...productDetails,...this.productDetails.deletedProducts],
      paymentDetails: [...this.templatePayments, ...this.deletedPayments]
    }

  this.submitted = true;
  if(this.editPosPaymentDetailsForm.valid){
    this.api.updatePos(this.productDetails.salesId,editPosJson).subscribe({
      next:(res)=>{
        this.toaster.success(this.constants.SuccessMessages.POS_UPDATED_MESSAGE);
        this.route.navigate(['/pos']);
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_ID_CAN_NOT_BE_BLANK_ERROR_CODE){
            this.toaster.error(this.constants.Messages.CUSTOMER_ID_CAN_NOT_BE_BLANK)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE){
            this.toaster.error(this.constants.Messages.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.POS_DATE_CAN_NOT_BE_BlANK_ERROR_CODE){
            this.toaster.error(this.constants.Messages.POS_DATE_CAN_NOT_BE_BLANK_MESSAGE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.POS_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toaster.error(this.constants.Messages.PURCHASE_ID_DOES_NOT_EXISTS_MESSAGE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.PAYMENT_DATE_CAN_NOT_BE_BLANK_ERROR_CODE){
            this.toaster.error(this.constants.Messages.PAYMENT_DATE_CAN_NOT_BE_BLANK)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.PAYMENT_METHOD_CAN_NOT_BE_BLANK_ERROR_CODE){
            this.toaster.error(this.constants.Messages.PAYMENT_METHOD_CAN_NOT_BE_BLANK)
          }
          else{
            this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_POS_MESSAGE)
          }
          
        }
        else{
          this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_POS_MESSAGE)
        }
      }
    })
  }
 
}
}
