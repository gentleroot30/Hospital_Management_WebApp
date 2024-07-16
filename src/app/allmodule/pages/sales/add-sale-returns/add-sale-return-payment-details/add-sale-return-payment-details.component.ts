import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesReturnService } from 'src/app/allmodule/services/api_services/sales-return.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { SaleReturnDataService } from 'src/app/allmodule/services/data_services/sale-return-data.service';
import { Constants } from 'src/app/app.constants';


@Component({
  selector: 'app-add-sale-return-payment-details',
  templateUrl: './add-sale-return-payment-details.component.html',
  styleUrls: ['./add-sale-return-payment-details.component.css']
})
export class AddSaleReturnPaymentDetailsComponent implements OnInit {
  paymentDetailsObject:any;
  productDetails:any;
  totalReturnAmount: number = 0;
  totalDiscount: number = 0;
  submitted = false;
  totalPaying: number = 0;
  totalPaid =0;
  payable: number = 0; // Initialize payable
  changeReturn: number = 0; // Initialize changeReturn
  balance: number = 0; // Initialize balance
  paymentDetails = [
    {
      "paymentMethod": 0,
      "amount": 0,
      "paymentDate": new Date()
    },
    // more payment details here
  ];
  addNewPayment() {
    if (this.paymentDetails.length < 3) {
      let date: Date = new Date();
      let dateString: string = date.toISOString().slice(0, 10);
      this.paymentDetails.push({
        paymentMethod: 0,
        amount: 0,
        paymentDate: new Date(dateString)
      });
    } else {
      this.toaster.error("You can only add up to 3 payment details.");
    }
  }
addSalesReturnPaymentForm!:FormGroup;
  constructor(private router:Router,private api: SalesReturnService, private dataService: SaleReturnDataService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder) 
    { 
      this.productDetails = this.dataService.getReturnProductDetails();
      this.paymentDetailsObject=this.dataService.getReturnPaymentDetails();
    }

  ngOnInit(): void {
    this.addSalesReturnPaymentForm = this.formBuilder.group({

      amount: [''],
      totalPaid: [''],

    })

    
 
  if(this.paymentDetailsObject){
    this.paymentDetails = this.paymentDetailsObject;   
  }
}
sendPaymentDetailsMetod(){ 
  this.dataService.setReurnPaymentDetails(this.paymentDetails);
}
onChangeTotalPaying(){  
  let totalPaying = Number(this.totalPaying);
    this.changeReturn = Math.max(0, totalPaying - this.productDetails.totalReturnAmount);
  this.balance = Math.max(0, this.productDetails.totalReturnAmount- totalPaying);
  
  }


  calculateTotalPaid() {
    this.totalPaid = this.paymentDetails.reduce((total, payment) => total + Number(payment.amount), 0);
  }
  
removePaymentDiv(index: number) {
  this.paymentDetails.splice(index, 1);

}


addSalesReturn(){
  if(this.paymentDetails.length === 0){
    this.toaster.error( "Please Add Payment Details");
  }

  
  let productDetails: any[] = [];
    productDetails=this.productDetails.productDetails;
    const addSalesReturnJson = {
      customerId: this.productDetails.customerId,
      totalReturnAmount: this.productDetails.totalReturnAmount,
      returnDate: this.productDetails.returnDate,
      totalReturnAmountPaid: this.totalPaid,
      productDetails:productDetails.map(product=>{
        let productId = product.productId
        let batchId = product.selectedBatchId
        let amount = product.amount
        let returnQuantity = Number(product.returnQuantity)
        return {
          productId,
          batchId,
          amount,
          returnQuantity
        };
      }),
      paymentDetails: this.paymentDetails
    }
    this.submitted = true;
    if(this.addSalesReturnPaymentForm.valid){
      this.api.addSaleReturns(addSalesReturnJson).subscribe({
        next:(res)=>{
          
          this.toaster.success(this.constants.SuccessMessages.SALESRETURN_SAVED_MESSAGE);
          this.router.navigate(['/sale-return']);
        },
        error:(error)=>{
          if(error.error.error){
            if(this.constants.ErrorCodes.SALE_RETURN_AMOUNT_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toaster.error(this.constants.Messages.SALE_RETURN_AMOUNT_CAN_NOT_BE_BLANK_ERROR_CODE)
            }
            else if(this.constants.ErrorCodes.SALE_RETURN_PAYMENT_METHOD_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toaster.error(this.constants.Messages.SALE_RETURN_PAYMENT_METHOD_CAN_NOT_BE_BLANK_ERROR_CODE)
            }
            else if(this.constants.ErrorCodes.QUANTITY_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toaster.error(this.constants.Messages.QUANTITY_CAN_NOT_BE_BLANK)
            }
            else if(this.constants.ErrorCodes.POS_DATE_CAN_NOT_BE_BlANK_ERROR_CODE){
                this.toaster.error(this.constants.Messages.POS_DATE_CAN_NOT_BE_BLANK_MESSAGE)
            }
            else{
              this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_SALESRETURN_MESSAGE)
            }
          }
          else{
            this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_SALESRETURN_MESSAGE)
          }

        }
      })
    }

}
}