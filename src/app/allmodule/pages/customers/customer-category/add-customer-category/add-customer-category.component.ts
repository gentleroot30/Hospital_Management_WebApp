import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerCategoryComponent } from '../customer-category.component';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { validate } from 'uuid';

@Component({
  selector: 'app-add-customer-category',
  templateUrl: './add-customer-category.component.html',
  styleUrls: ['./add-customer-category.component.css']
})
export class AddCustomerCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;
  submitted = false;
  addCustomerCategoryForm: any;

  constructor(
    private formBuilder: FormBuilder ,public dialogRef: MatDialogRef<AddCustomerCategoryComponent>,private api:CustomersService,private router:Router,private toastr: ToastrService, private constants: Constants
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  ngOnInit(): void {this.addCustomerCategoryForm = this.formBuilder.group({
   
    categoryName: ['', [Validators.required, Validators.pattern("^[a-zA-Z '-]+$"),Validators.maxLength(20)]],
    description: ['',Validators.maxLength(50)],

  });
}



get f() { return this.addCustomerCategoryForm.controls; }

addCustomerCategory(){
  this.submitted = true;
  if(this.addCustomerCategoryForm.valid){
   
     this.api.AddCustomerCategory(this.addCustomerCategoryForm.value).subscribe({
     
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
        else if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_CATEGORY_EXIST_ERROR_CODE)
        {
          this.toastr.error(this.constants.Messages.CUSTOMER_CATEGORY_EXIST_MESSAGE)
        }
        else {
          this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_CUSTOMER_CATEGORY_MESSAGE)
        }
      }
      }
     })
  }
}
}
