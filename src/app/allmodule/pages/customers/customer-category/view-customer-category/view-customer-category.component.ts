import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';

@Component({
  selector: 'app-view-customer-category',
  templateUrl: './view-customer-category.component.html',
  styleUrls: ['./view-customer-category.component.css']
})
export class ViewCustomerCategoryComponent implements OnInit {

  viewCustomerCategoryForm!: FormGroup;
  submitted = false;
  viewdata: any;
  
  
  

  constructor(
    private formBuilder: FormBuilder,public dialogRef: MatDialogRef<ViewCustomerCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,  private api:CustomersService,
  ) {
    this.viewdata=data;
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
 

  ngOnInit(): void {this.viewCustomerCategoryForm = this.formBuilder.group({
    categoryName: ['', Validators.required],
    description: ['', Validators.required],
  });

  this.api.getCustomerCategoryById(this.viewdata).subscribe({
    next:(res)=>{
    this.viewCustomerCategoryForm.controls['categoryName'].setValue(res.data.categoryName);
    this.viewCustomerCategoryForm.controls['description'].setValue(res.data.description);
    },
   
    })
   }
  


  get f() { return this.viewCustomerCategoryForm.controls; }


}
