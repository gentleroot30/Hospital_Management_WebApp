import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';
import { PurchaseDataService } from 'src/app/allmodule/services/data_services/purchase-data.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-view-purchase-payment-details',
  templateUrl: './view-purchase-payment-details.component.html',
  styleUrls: ['./view-purchase-payment-details.component.css']
})
export class ViewPurchasePaymentDetailsComponent implements OnInit {

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
  viewPurchasePaymentDetailsForm!:FormGroup;
  constructor(private router: Router,private activateRouter:ActivatedRoute, private api: PurchasesService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,private dataService:PurchaseDataService) 
    {
      
      this.productDetails = this.dataService.getPurchaseProductDetails();
      this.paymentDetails = this.dataService.getPurchasePaymentDetails();
     }

  ngOnInit(): void {
    this.viewPurchasePaymentDetailsForm = this.formBuilder.group({
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



}



