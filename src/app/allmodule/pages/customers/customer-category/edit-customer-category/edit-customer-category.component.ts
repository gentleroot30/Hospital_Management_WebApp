import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';

import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-customer-category',
  templateUrl: './edit-customer-category.component.html',
  styleUrls: ['./edit-customer-category.component.css']
})
export class EditCustomerCategoryComponent implements OnInit {

  editCustomerCategoryForm!: FormGroup;
  submitted = false;
  editdata: any;

  constructor(
    private formBuilder: FormBuilder,public dialogRef: MatDialogRef<EditCustomerCategoryComponent>,
    private api:CustomersService,private router:Router,private toastr: ToastrService, private constants: Constants,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
  this.editdata=data;
  }

  onNoClick(): void {
    
    this.dialogRef.close();
  }
 
  
  ngOnInit(): void {
    this.editCustomerCategoryForm = this.formBuilder.group({
     // CUSTOMER_CATEGORYId:[],
     categoryName: ['', [Validators.required, Validators.pattern("^[a-zA-Z '-]+$"),Validators.maxLength(20)]],
    description: ['',Validators.maxLength(20)],

  });
  this.api.getCustomerCategoryById(this.editdata).subscribe({
    next:(res)=>{
     
    this.editCustomerCategoryForm.controls['categoryName'].setValue(res.data.categoryName);
    this.editCustomerCategoryForm.controls['description'].setValue(res.data.description);
    },
    error:()=>{},
  })
  
}


get f() { return this.editCustomerCategoryForm.controls; }

editCustomerCategory(){
 
  this.submitted = true;
  if(this.editCustomerCategoryForm.valid){
    this.api.updateCustomerCategory(this.editdata,this.editCustomerCategoryForm.value).subscribe({
      next:(res)=>{
        this.dialogRef.close(res);
      },
      error:(error)=>{
        if(error.error.error)
        {
          if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE)
          {
            this.toastr.error(this.constants.Messages.CUSTOMER_CATEGORY_ID_DOES_NOT_EXISTS)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_CATEGORY_NAME_CAN_NOT_BE_BLANK_CODE)
          {
            this.toastr.error(this.constants.Messages.CUSTOMER_CATEGORY_NAME_CAN_NOT_BE_BLANK_MESSAGE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_CUSTOMER_CATEGORY_CODE)
          {
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_CATEGORY_DATA_MESSAGE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_CATEGORY_EXIST_ERROR_CODE)
          {
          this.toastr.error(this.constants.Messages.CUSTOMER_CATEGORY_EXIST_MESSAGE)
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_UPDATED_CUSTOMER_CATEGORY_MESSAGE)
          }
        }
      }
      
    })
  }
}
}
