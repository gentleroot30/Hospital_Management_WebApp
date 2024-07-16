import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { error, param } from 'jquery';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  viewCustomerForm!: FormGroup;
  submitted = false;
  data:any
  cid!:number;
  customerData:any[]=[]
  Hide_button=false;
  hidden_1=true;
  hidden_2=true;
  // route: any;

  constructor(private formBuilder:FormBuilder,private api:CustomersService,private activeRouter:ActivatedRoute) { }
  customerId: any=0;
  ngOnInit(): void {
    
    this.customerId = this.activeRouter.snapshot.queryParams['customerId']
    this.viewCustomerForm = this.formBuilder.group({
      customerCode: [''],
      categoryName: [''],
      ethnicity: [''],
      customerName: [''],
      customField_1: [''],
      customField_2: [''],
      address: [''],
      contactNo_1: ['',Validators.required],
      contactNo_2: ['',Validators.required],
      contactNo_3: ['',Validators.required],
    });
  this.api.getCustomerById(this.customerId).subscribe({
    next:(res)=>{
      this.viewCustomerForm.controls['customerCode'].setValue(res.data.customerCode);
      this.viewCustomerForm.controls['categoryName'].setValue(res.data.categoryName);
      this.viewCustomerForm.controls['ethnicity'].setValue(res.data.ethnicity);
      this.viewCustomerForm.controls['customerName'].setValue(res.data.customerName);
      this.viewCustomerForm.controls['customField_1'].setValue(res.data.customField_1);
      this.viewCustomerForm.controls['customField_2'].setValue(res.data.customField_2);
      this.viewCustomerForm.controls['address'].setValue(res.data.address);
      this.viewCustomerForm.controls['contactNo_1'].setValue(res.data.contactNo_1);
      this.viewCustomerForm.controls['contactNo_1'].setValue(res.data.contactNo_1);
      this.viewCustomerForm.controls['contactNo_2'].setValue(res.data.contactNo_2);
      this.viewCustomerForm.controls['contactNo_3'].setValue(res.data.contactNo_3);


      if(res.data.contactNo_2.length>0)
      this.hidden_1=false;

      if(res.data.contactNo_3.length>0){
      this.hidden_2=false;
      this.Hide_button=true;
      }
    },
    error:(err)=>{
      alert("something went wrong")
    }
  })



}
    
  }
  

  

  
 


