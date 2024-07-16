import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseReturnService } from 'src/app/allmodule/services/api_services/purchase-return.service';
import { PurchaseReturnDataService } from 'src/app/allmodule/services/data_services/purchase-return-data.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-view-purchase-returns-payment-details',
  templateUrl: './view-purchase-returns-payment-details.component.html',
  styleUrls: ['./view-purchase-returns-payment-details.component.css']
})
export class ViewPurchaseReturnsPaymentDetailsComponent implements OnInit {

  templatePayments: any[] = [];
  deletedPayments: any[] = [];
  productDetails: any;
  paymentDetails:any;
  submitted = false;
  totalPaying: number = 0;
  
  totalReturnAmountPaid = 0;
  changeReturn: number = 0; // Initialize changeReturn
  balance: number = 0; // Initialize balance
  
  viewPurchaseReturnsPaymentDetailsForm!:FormGroup;
  constructor(private router: Router,private activateRouter:ActivatedRoute, private api: PurchaseReturnService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,private dataService:PurchaseReturnDataService) 
    {
      
      this.productDetails = this.dataService.getReturnProductDetails();
      this.paymentDetails = this.dataService.getReturnPaymentDetails();
     }

  ngOnInit(): void {
    this.viewPurchaseReturnsPaymentDetailsForm = this.formBuilder.group({
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
      this.changeReturn = Math.max(0, totalPaying - this.productDetails.totalReturnBill);
    this.balance = Math.max(0, this.productDetails.totalReturnBill - totalPaying); 
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
 
  


 

}
