import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';

@Component({
  selector: 'app-view-expenses-category',
  templateUrl: './view-expenses-category.component.html',
  styleUrls: ['./view-expenses-category.component.css']
})
export class ViewExpensesCategoryComponent implements OnInit {
  viewExpensesCategoryForm! : FormGroup;
  submitted = false;
  viewdata: any;

  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<ViewExpensesCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data:any,  private api:ExpensesService,) {
    this.viewdata=data;
   }


  onNoClick(): void {
    this.dialogRef.close();
  }
 
  ngOnInit(): void {this.viewExpensesCategoryForm = this.formBuilder.group({
    categoryName: ['', Validators.required],
    description: ['', Validators.required],
  });
  this.api.getExpensesCategoryById(this.viewdata).subscribe({
    next:(res)=>{
    this.viewExpensesCategoryForm.controls['categoryName'].setValue(res.data.categoryName);
    this.viewExpensesCategoryForm.controls['description'].setValue(res.data.description);
    },
   
    })
   }

 get f() { return this.viewExpensesCategoryForm.controls; }

 

}
