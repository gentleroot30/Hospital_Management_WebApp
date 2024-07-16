import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-product-brand',
  templateUrl: './add-product-brand.component.html',
  styleUrls: ['./add-product-brand.component.css'],
})
export class AddProductBrandComponent implements OnInit {
  addBrandForm!: FormGroup;
  submitted = false;
  brands: any = [];
  constructor(
    private api: ProductService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProductBrandComponent>,
    private toastr: ToastrService ,
    private constants:Constants
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.addBrandForm = this.formBuilder.group({
      brandName: ['',[Validators.required, Validators.pattern("^[a-zA-Z '-]+$"),Validators.maxLength(20)]],
      description: ['',Validators.maxLength(50)],
    });
  }

  get f() {
    return this.addBrandForm.controls;
  }

  addProductBrand() {
    this.submitted = true;
    if (this.addBrandForm.valid) {
      this.api.AddBrand(this.addBrandForm.value).subscribe({
        next: (res) => {
          this.dialogRef.close(res);
          //alert(' Brand Added Successfully ')
          this.toastr.success(this.constants.SuccessMessages.BRAND_SAVED_MESSAGE);
        },
        error: (error) => {

          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.BRAND_NAME_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toastr.error(this.constants.Messages. BRAND_NAME_CAN_NOT_BE_BLANK_MESSAGE)
            }
            else{
              this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_BRAND_MESSAGE)
            }
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_BRAND_MESSAGE)
          }

          // this.toastr.error(
          //   `Error while adding product : ${Response['error']}`
          // );
        },
      });
    }
  }
}
