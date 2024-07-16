import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseReturnService } from 'src/app/allmodule/services/api_services/purchase-return.service';
import { SalesReturnService } from 'src/app/allmodule/services/api_services/sales-return.service';
import { PurchaseReturnDataService } from 'src/app/allmodule/services/data_services/purchase-return-data.service';
import { SaleReturnDataService } from 'src/app/allmodule/services/data_services/sale-return-data.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-purchase-return-payment-details',
  templateUrl: './add-purchase-return-payment-details.component.html',
  styleUrls: ['./add-purchase-return-payment-details.component.css']
})
export class AddPurchaseReturnPaymentDetailsComponent implements OnInit {

  paymentDetailsObject:any;
  productDetails:any;
  totalReturnAmount: number = 0;
  totalDiscount: number = 0;
  submitted = false;
  totalPaying: number = 0;
  totalReturnPaid =0;
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
  addPurchaseReturnPaymentForm!:FormGroup;
  constructor(private router:Router,private api: PurchaseReturnService, private dataService: PurchaseReturnDataService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder) 
    { 
      this.productDetails = this.dataService.getReturnProductDetails();
      this.paymentDetailsObject=this.dataService.getReturnPaymentDetails();
    }

  ngOnInit(): void {
    this.addPurchaseReturnPaymentForm = this.formBuilder.group({

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
    this.totalReturnPaid = this.paymentDetails.reduce((total, payment) => total + Number(payment.amount), 0);
  }
  
removePaymentDiv(index: number) {
  this.paymentDetails.splice(index, 1);

}


addPurchaseReturn(){
  if(this.paymentDetails.length === 0){
    this.toaster.error( "Please Add Payment Details");
  }

  debugger
  let productDetails: any[] = [];
    productDetails=this.productDetails.productDetails;
    const addPurchaseReturnJson = {
      supplierId: this.productDetails.supplierId,
      totalReturnBill: this.productDetails.totalReturnAmount,
      totalReturnPaid:this.totalReturnPaid,
      returnDate: this.productDetails.returnDate,
      totalReturnDataDTO:productDetails.map(product=>{
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
    if(this.addPurchaseReturnPaymentForm.valid){
      this.api.addPurchaseReturn(addPurchaseReturnJson).subscribe({
        next:(res)=>{
          
          this.toaster.success(this.constants.SuccessMessages.PURCHASE_RETURN_SAVED_MESSAGE);
          this.router.navigate(['/purchases-returns-tab']);
        },
        error:(error)=>{
          if(error.error.error){
           
           if(this.constants.ErrorCodes.QUANTITY_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toaster.error(this.constants.Messages.QUANTITY_CAN_NOT_BE_BLANK)
            }
            else if(this.constants.ErrorCodes.RETURN_DATE_CAN_NOT_BE_BLANK_ERROR_CODE){
                this.toaster.error(this.constants.Messages.RETURN_DATE_CAN_NOT_BE_BLANK)
            }
            else{
              this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_PURCHASE_RETURN_MESSAGE)
            }
          }
          else{
            this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_PURCHASE_RETURN_MESSAGE)
          }

        }
      })
    }

}

}
