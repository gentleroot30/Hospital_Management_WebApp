import { Component,Inject,Input, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
@Component({
  selector: 'app-view-product-brand',
  templateUrl: './view-product-brand.component.html',
  styleUrls: ['./view-product-brand.component.css']
})
export class ViewProductBrandComponent implements OnInit {
  viewProductBrandForm!: FormGroup;
  submitted = false;
  viewdata: any;

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewProductBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private api:ProductService,
  ) {this.viewdata=data; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.viewProductBrandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.api.getBrandById(this.viewdata).subscribe({
      next:(res)=>{
        // console.log(res);
        this.viewProductBrandForm.controls['brandName'].setValue(res.data.brandName);
        this.viewProductBrandForm.controls['description'].setValue(res.data.description);
        },
      })
  }

  get f() { return this.viewProductBrandForm.controls; }


}








   
  

  
 

 


