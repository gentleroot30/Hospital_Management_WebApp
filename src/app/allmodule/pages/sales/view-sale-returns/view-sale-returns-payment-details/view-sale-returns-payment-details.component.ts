import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { SalesReturnService } from 'src/app/allmodule/services/api_services/sales-return.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { SaleReturnDataService } from 'src/app/allmodule/services/data_services/sale-return-data.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-view-sale-returns-payment-details',
  templateUrl: './view-sale-returns-payment-details.component.html',
  styleUrls: ['./view-sale-returns-payment-details.component.css']
})
export class ViewSaleReturnsPaymentDetailsComponent implements OnInit {
  paymentDetailsObject:any;
  returnProductDetails:any;
  totalReturnAmount: number = 0;
  totalDiscount: number = 0;
 returnId = 0
  submitted = false;
  totalPaying: number = 0;
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
  viewSaleReturnPaymentDetailsForm!:FormGroup;
  constructor(private router: Router,private activateRouter:ActivatedRoute, private api: SalesReturnService, public dialog: MatDialog,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,private dataService:SaleReturnDataService) { }

  ngOnInit(): void {
    debugger
    this.viewSaleReturnPaymentDetailsForm = this.formBuilder.group({
      
      amount: [''],
      totalPaid: [''],

      
    })
    this.returnProductDetails = this.dataService.getReturnProductDetails();
    this.returnProductDetails.paymentDetailsObject=this.dataService.getReturnPaymentDetails();
    
    if(this.returnProductDetails.paymentDetails){
      this.paymentDetails = this.returnProductDetails.paymentDetails;
      this.paymentDetails.forEach((payment: any)=>{
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
  
  sendPaymentDetailsMetod(){ 
    this.dataService.setReurnPaymentDetails(this.paymentDetails);
  }
}
