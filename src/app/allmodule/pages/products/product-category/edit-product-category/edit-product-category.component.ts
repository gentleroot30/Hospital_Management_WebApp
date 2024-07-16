import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-product-category',
  templateUrl: './edit-product-category.component.html',
  styleUrls: ['./edit-product-category.component.css']
})
export class EditProductCategoryComponent implements OnInit {
  
  editProductCategoryForm!: FormGroup;
  submmited = false;
  editdata: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef:MatDialogRef<EditProductCategoryComponent>,
    private api:ProductService,
    private toastr: ToastrService,private constants: Constants,
    @Inject(MAT_DIALOG_DATA) public data:any) 
    { 
    this.editdata = data;
  }

  onNoClick() : void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.editProductCategoryForm = this.formBuilder.group({
      categoryName: ['',[Validators.required, Validators.pattern("^[a-zA-Z '-]+$"),Validators.maxLength(20)]],
      description: ['',[ Validators.required,Validators.maxLength(50)]],
    });
    this.api.getProductCategoryById(this.editdata).subscribe({
      next:(res)=>{
        this.editProductCategoryForm.controls['categoryName'].setValue(res.data.categoryName);
        this.editProductCategoryForm.controls['description'].setValue(res.data.description);
      },
      error:()=>{

      }
    })
  }

  get f() {return this.editProductCategoryForm.controls;}

  editProductCategory(){
    
    this.submmited = true;
    if(this.editProductCategoryForm.valid){
      this.api.updateProductCategory(this.editdata,this.editProductCategoryForm.value).subscribe({
        next :(res)=> {
          // this.toastr.success('Category edited successfully');
          this.dialogRef.close(res);
        },
        error :(error)=>{
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.PRODUCT_CATEGORY_NAME_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toastr.error(this.constants.Messages. PRODUCT_CATEGORY_NAME_CAN_NOT_BE_BLANK_ERROR_CODE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes. FAILED_TO_UPDATE_PRODUCT_CATEGORY_CODE ){
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_PRODUCT_CATEGORY_MESSAGE)
            }
            else{
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_PRODUCT_CATEGORY_MESSAGE)
            }
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_PRODUCT_CATEGORY_MESSAGE)
          }

        },
      });
    }
  }
}
