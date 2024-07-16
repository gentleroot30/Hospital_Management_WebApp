import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';

@Component({
  selector: 'app-view-product-category',
  templateUrl: './view-product-category.component.html',
  styleUrls: ['./view-product-category.component.css']
})
export class ViewProductCategoryComponent implements OnInit {
  viewProductCategoryForm!: FormGroup;
  submitted = false;
  viewdata : any;


  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<ViewProductCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private api:ProductService) {
      this.viewdata = data;
     }

    onNoClick(): void{
      this.dialogRef.close();
    }

    ngOnInit(): void{
      this.viewProductCategoryForm = this.formBuilder.group({
        categoryName: ['',Validators.required],
        description: ['', Validators.required],
      });
      this.api.getProductCategoryById(this.viewdata).subscribe({
        next:(res)=>{
          this.viewProductCategoryForm.controls['categoryName'].setValue(res.data.categoryName);
          this.viewProductCategoryForm.controls['description'].setValue(res.data.description);

        }
      })
    }

  get f() {return this.viewProductCategoryForm.controls;}

 

}
