import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {
  
  addCategoryForm!: FormGroup;
  submitted = false;
  addProductCategoryForm: any;

  constructor(private formBuilder: FormBuilder,public dialoRef: MatDialogRef<AddProductCategoryComponent>,private api:ProductService, private toastr: ToastrService ,
    private constants:Constants,) { }
  
  onNoClick(): void {
    this.dialoRef.close();
  }
  ngOnInit(): void {this.addProductCategoryForm = this.formBuilder.group({
    categoryName: ['',[Validators.required, Validators.pattern("^[a-zA-Z '-]+$"),Validators.maxLength(20)]],
    description: ['',[ Validators.required,Validators.maxLength(50)]],
  })
 }

 get f() {return this.addProductCategoryForm.controls; }
 
 addProductCategory(){
  this.submitted = true;
  if (this.addProductCategoryForm.valid) {
    this.api.addProductCategory(this.addProductCategoryForm.value).subscribe({
      next:(res)=>{
        this.dialoRef.close();
        this.toastr.success(this.constants.SuccessMessages.PRODUCT_CATEGORY_SAVED_MESSAGE);
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.PRODUCT_CATEGORY_NAME_CAN_NOT_BE_BLANK_ERROR_CODE){
            this.toastr.error(this.constants.Messages. PRODUCT_CATEGORY_NAME_CAN_NOT_BE_BLANK_ERROR_CODE)
          }
          else{
            this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_PRODUCT_CATEGORY_MESSAGE)
          }
        }
        else {
          this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_PRODUCT_CATEGORY_MESSAGE)
        }
      },
      
    });
 }}


}
