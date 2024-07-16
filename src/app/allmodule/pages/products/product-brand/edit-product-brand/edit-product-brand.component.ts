import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-product-brand',
  templateUrl: './edit-product-brand.component.html',
  styleUrls: ['./edit-product-brand.component.css']
})
export class EditProductBrandComponent implements OnInit {
  editBrandForm!: FormGroup;
  submitted = false;
  editdata:any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProductBrandComponent>,
    private api:ProductService, private constants: Constants,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {this.editdata=data;}

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  ngOnInit(): void {
    this.editBrandForm = this.formBuilder.group({
    brandName: ['',[Validators.required, Validators.pattern("^[a-zA-Z '-]+$"),Validators.maxLength(20)]],
    description: ['',Validators.maxLength(50)],
  });
  this.api.getBrandById(this.editdata).subscribe({
    next:(res)=>{
      this.editBrandForm.controls['brandName'].setValue(res.data.brandName);
      this.editBrandForm.controls['description'].setValue(res.data.description);
      },
      

  })

}

get f() { return this.editBrandForm.controls; }

editBrand(){
  this.submitted = true;
  if(this.editBrandForm.valid){
    this.api.UpdateBrand(this.editdata,this.editBrandForm.value).subscribe({
      next : (res)=>{
        this.dialogRef.close(res);
        // this.editBrandForm.reset();
        },
        error :(error)=>{
          if(error.error.error){
            if(error.error.error.code=== this.constants.ErrorCodes.BRAND_NAME_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toastr.error(this.constants.Messages. BRAND_NAME_CAN_NOT_BE_BLANK_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.  FAILED_TO_UPDATE_BRAND_ERROR_CODE ){
              this.toastr.error(this.constants.Messages.FAILED_TOUPDATE_BRAND_MESSAGE)
            }
            else{
              this.toastr.error(this.constants.Messages.FAILED_TOUPDATE_BRAND_MESSAGE)
            }
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TOUPDATE_BRAND_MESSAGE)
          }

        }
      })



   
  }
}

}
