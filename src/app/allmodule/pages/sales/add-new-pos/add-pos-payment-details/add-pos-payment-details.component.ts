import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { Constants } from 'src/app/app.constants';
import { PosTableTemplateComponent } from '../../pos-table-template/pos-table-template.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-pos-payment-details',
  templateUrl: './add-pos-payment-details.component.html',
  styleUrls: ['./add-pos-payment-details.component.css']
})
export class AddPosPaymentDetailsComponent implements OnInit {
  createdDivs: any[] = [];
  addPosPaymentDetailsForm!: FormGroup;
  submitted = false;
  productDetails: any;
  paymentDetailsObject:any;

  totalPaying: number = 0;
  totalAmount: number = 0;
  totalPaid =0;
  payable: number = 0; // Initialize payable
  changeReturn: number = 0; // Initialize changeReturn
  balance: number = 0; // Initialize balance
  minDate: string = '';
  paymentDetails = [
    {
      "paymentMethod": 0,
      "amount": 0,
      "paymentDate": new Date()
    },
    // more payment details here
  ];
  payments: any;

  private setMinDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

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
  
  constructor(private route: Router, private api: PosService, private dataService: PosDataService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,public dialog: MatDialog) 
    {
    this.setMinDate();

  }
  
  
  ngOnInit(): void {
    this.addPosPaymentDetailsForm = this.formBuilder.group({

      amount: [''],
      

    })
    
    this.productDetails = this.dataService.getProductDetails();
   
    this.paymentDetailsObject=this.dataService.getPaymentDetails();
    if(this.paymentDetailsObject){
      this.paymentDetails = this.paymentDetailsObject;   
    }


  }
  sendPaymentDetailsMetod(){ 
      this.dataService.setPaymentDetails(this.paymentDetails);
    }
  
    onChangeTotalPaying(){  
    let totalPaying = Number(this.totalPaying);
      this.changeReturn = Math.max(0, totalPaying - this.productDetails.payable);
    this.balance = Math.max(0, this.productDetails.payable - totalPaying);
    
    }


    calculateTotalPaid() {
      this.totalPaid = this.paymentDetails.reduce((total, payment) => total + Number(payment.amount), 0);
    }
    
  removePaymentDiv(index: number) {
    this.paymentDetails.splice(index, 1);

  }



  get f() { return this.addPosPaymentDetailsForm.controls; }
  
  openPosTableTemplate() {
    this.dialog.open(PosTableTemplateComponent, {
      width: '600px',
      data: { /* pass any data here if necessary */ }
    });
  }

  addPos() {

if(this.paymentDetails.length === 0){
  this.toaster.error( "Please Add Payment Details");
}

this.calculateTotalPaid();
if (this.totalPaid > this.productDetails.payable) {
  this.toaster.error("Amount is greater than payable amount");
  return;
}

    let productDetails: any[] = [];
    productDetails=this.productDetails.productDetails;
    const addPosJson = {
      customerId: this.productDetails.customerId,
      totalBill: this.productDetails.payable,
      posDate: this.productDetails.posDate,
      totalPaid: this.totalPaid,
      productDetails:productDetails.map(productDetails=>{
        let productId = productDetails.productId
        let quantity = Number (productDetails.salesQuantity)
        let amount = productDetails.amount
        let batchId = productDetails.selectedBatchId
        return {
          productId,
          quantity,
          amount,
          batchId
        };
      }),
      paymentDetails: this.paymentDetails
    }
    this.submitted = true;
    if (this.addPosPaymentDetailsForm.valid) {
      this.api.AddPos(addPosJson).subscribe({
        next:(res)=>{
          this.openPosTableTemplate();
          // this.toaster.success("Pos added successfully");
          //this.route.navigate(['/pos']);
         
        },
        error:(error)=> {
          
          if(error.error.error){
              if(error.error.error.code === this.constants.ErrorCodes.POS_DATE_CAN_NOT_BE_BlANK_ERROR_CODE){
                this.toaster.error(this.constants.Messages.POS_DATE_CAN_NOT_BE_BLANK_MESSAGE);
              }
              else if(error.error.error.code === this.constants.ErrorCodes.PAYMENT_DATE_CAN_NOT_BE_BLANK_ERROR_CODE){
               
                  this.toaster.error(this.constants.Messages.PAYMENT_DATE_CAN_NOT_BE_BLANK)
              }
                else if(error.error.error.code === this.constants.ErrorCodes.PAYMENT_METHOD_CAN_NOT_BE_BLANK_ERROR_CODE){
                  
                    this.toaster.error(this.constants.Messages.PAYMENT_METHOD_CAN_NOT_BE_BLANK)
                  
                }

                else if(error.error.error.code === this.constants.ErrorCodes.AMOUNT_CAN_NOT_BE_BLANK_ERROR_CODE){
                  this.toaster.error(this.constants.Messages.AMOUNT_CAN_NOT_BE_BLANK)
                }
              else{
                this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_POS_MESSAGE)
              }
          }
          else{
            this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_POS_MESSAGE)
          }
        },
      })


    }
  }
}
