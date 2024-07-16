import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-view-pos-paymentdetails',
  templateUrl: './view-pos-paymentdetails.component.html',
  styleUrls: ['./view-pos-paymentdetails.component.css']
})
export class ViewPosPaymentdetailsComponent implements OnInit {

  createdDivs: any[] = [];
  editPosPaymentDetailsForm!: FormGroup;
  submitted = false;
  posProductDetails: any;
  paymentDetailsObject:any;

  salesId:number = 0;
  totalPaying: number = 0;
  totalDiscount: number = 0;
  customerId:any;
  totalBill:any;
  posDate:any;
  totalPaid:any;

  totalAmount: number = 0;
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

  createPaymentDiv() {
    let date: Date = new Date();
    let dateString: string = date.toISOString().slice(0, 10);
    this.paymentDetails.push({
      paymentMethod: 0,
      amount: 0,
      paymentDate: new Date(dateString)
    });
  }

  constructor(private route: Router, private api: PosService, private dataService: PosDataService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editPosPaymentDetailsForm = this.formBuilder.group({

      amount: [''],
      totalPaid: [''],

      
    })
     
    this.posProductDetails = this.dataService.getProductDetails();
    this.posProductDetails.paymentDetailsObject=this.dataService.getPaymentDetails();
   
    if(this.posProductDetails.paymentDetails){
      this.paymentDetails = this.posProductDetails.paymentDetails;
      this.paymentDetails.forEach((payment: any)=>{
        payment.paymentDate = this.formatDate(payment.paymentDate); 
      });
      this.salesId = this.posProductDetails.salesId;
    }
   
   
  }

  sendPaymentDetailsMetod(){ 
    
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




  // calculateTotalPaying(value: any, payment: any) {
  //   if(value == ''  || value == null ){
  //     value = 0;
  //    } 
  //    if (!isNaN(value)){
  //     this.totalPaying = Number(this.totalPaying)-Number(payment.amount)+Number(value); 
  //     payment.amount = value;
  //   }
  //   this.updateCalculations()
  // }

  // removePaymentDiv(index: number) {
  //   this.totalPaying -= this.paymentDetails[index].amount;
  //   this.paymentDetails.splice(index, 1);
  //    this.updateCalculations();

  // }
  // updateCalculations() {
  //   this.payable = this.posProductDetails.totalBill - this.totalDiscount;
  //   this.changeReturn = Math.max(0, this.totalPaying - this.posProductDetails.totalBill);
  //   this.balance = Math.max(0,this.posProductDetails.totalBill -  this.totalPaying);
  // }
  


}
