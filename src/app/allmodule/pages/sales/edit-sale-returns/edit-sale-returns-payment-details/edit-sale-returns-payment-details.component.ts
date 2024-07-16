import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { SalesReturnService } from 'src/app/allmodule/services/api_services/sales-return.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { SaleReturnDataService } from 'src/app/allmodule/services/data_services/sale-return-data.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-sale-returns-payment-details',
  templateUrl: './edit-sale-returns-payment-details.component.html',
  styleUrls: ['./edit-sale-returns-payment-details.component.css']
})
export class EditSaleReturnsPaymentDetailsComponent implements OnInit {

  templatePayments: any[] = [];
  deletedPayments: any[] = [];
  productDetails: any;
  paymentDetails:any;
  submitted = false;
  totalPaying: number = 0;
  
  totalReturnAmountPaid = 0;
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
  editSaleReturnPaymentDetailsForm!:FormGroup;
  constructor(private router: Router,private activateRouter:ActivatedRoute, private api: SalesReturnService, public dialog: MatDialog,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,private dataService:SaleReturnDataService) 
    {
      
      this.productDetails = this.dataService.getReturnProductDetails();
      this.paymentDetails = this.dataService.getReturnPaymentDetails();
     }

  ngOnInit(): void {
    this.editSaleReturnPaymentDetailsForm = this.formBuilder.group({
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
  
  sendReturnPaymentDetails(){ 
    
    this.paymentDetails.templatePayments = this.templatePayments;
    this.paymentDetails.deletedPaymentDetails = this.deletedPayments
    this.dataService.setReurnPaymentDetails(this.paymentDetails);
  }



  onChangeTotalPaying(){  
    
    let totalPaying = Number(this.totalPaying);
      this.changeReturn = Math.max(0, totalPaying - this.productDetails.totalReturnAmount);
    this.balance = Math.max(0, this.productDetails.totalReturnAmount - totalPaying); 
    }


  calculateTotalPaying(value: any, payment: any) {
    if(value == ''  || value == null ){
      value = 0;
      
    }  
    payment.amount = value   
    if (payment.opType !== 1) {
      payment.opType = 2;
      
    }
    this.totalReturnAmountPaid = this.templatePayments.reduce((total) => total + Number(value), 0);
    
}


removePaymentDiv(index: number) {
    
  let deletedPayment = {
    "paymentId": this.templatePayments[index].paymentId,
    "opType": 3
  };
  
  this.templatePayments.splice(index, 1);
 this.deletedPayments.push(deletedPayment)
 
}
 
  


 editSaleReturns(){
  
  let productDetails: any[] = [];
  if(this.productDetails.productDetails){
    for(let product of this.productDetails.productDetails){
        let newProduct = {
            productId: product.productId,
            returnQuantity: product.returnQuantity,
            amount: product.amount,
            batchId: Number(product.selectedBatchId),
            opType: product.opType !== undefined ? product.opType : product.opType 
        };
        productDetails.push(newProduct);
    }
}
  
    const editSaleReturnsJson = {
      
      customerId: this.productDetails.customerId,
      totalReturnAmount: this.productDetails.totalReturnAmount,
      returnDate: this.productDetails.returnDate,
      totalReturnAmountPaid: this.totalReturnAmountPaid,
      productDetails:[...productDetails,...this.productDetails.deletedProducts],
      paymentDetails: [...this.templatePayments, ...this.deletedPayments]
    }
this.submitted = true;

if(this.editSaleReturnPaymentDetailsForm.valid){
  
  this.api.updateSaleReturns(this.productDetails.returnId,editSaleReturnsJson).subscribe({
    next:(res)=>{
      
      this.toaster.success(this.constants.SuccessMessages.SALESRETURN_UPDATED_MESSAGE);
      this.router.navigate(['/sale-return']);
    },
    error:(error)=>{
      if(error.error.error){
        if(error.error.error.code === this.constants.ErrorCodes.AMOUNT_CAN_NOT_BE_BLANK_ERROR_CODE){
          this.toaster.error(this.constants.Messages.AMOUNT_CAN_NOT_BE_BLANK)
        }
        else if(error.error.error.code === this.constants.ErrorCodes.BATCH_ID_DOES_NOT_EXISTS_ERROR_CODE){
          this.toaster.error(this.constants.Messages.BRAND_ID_CAN_NOT_BE_BLANK_MESSAGE)
        }
        else if(error.error.error.code === this.constants.ErrorCodes.BATCH_ID_FK_CAN_NOT_BE_BLANK_ERROR_CODE){
          this.toaster.error(this.constants.Messages.BATCH_ID_FK_CAN_NOT_BE_BLANK)
        }
        else if(error.error.error.code === this.constants.ErrorCodes.PAYMENT_DATE_CAN_NOT_BE_BLANK_ERROR_CODE){
          this.toaster.error(this.constants.Messages.PAYMENT_DATE_CAN_NOT_BE_BLANK)
        }
        else if (error.error.error.code === this.constants.ErrorCodes.PAYMENT_METHOD_CAN_NOT_BE_BLANK_ERROR_CODE){
          this.toaster.error(this.constants.Messages.PAYMENT_METHOD_CAN_NOT_BE_BLANK)
        }
        else if(error.error.error.code === this.constants.ErrorCodes.RETURN_QUANTITY_CAN_NOT_BE_BLANK_ERROR_CODE){
          this.toaster.error(this.constants.Messages.RETURN_QUANTITY_CAN_NOT_BE_BLANK)
        }
        else{
          this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_SALESRETURN_MESSAGE)
        }

      }
      else{
        this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_SALESRETURN_MESSAGE)
      }
    }
  })
}

 }
}
