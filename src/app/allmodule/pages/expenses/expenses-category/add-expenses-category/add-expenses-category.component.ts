import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-expenses-category',
  templateUrl: './add-expenses-category.component.html',
  styleUrls: ['./add-expenses-category.component.css']
})
export class AddExpensesCategoryComponent implements OnInit {
  addCategoryForm!: FormGroup;
  submitted = false;
  addExpensesCategoryForm: any;
  
  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddExpensesCategoryComponent>, private api:ExpensesService,private constants:Constants,private toastr:ToastrService) 
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }
 

  ngOnInit(): void {
    this.addExpensesCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required,
        Validators.pattern(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/),
        Validators.maxLength(20)]],
        description: [
        '',
        [
          
          Validators.maxLength(50)
        ]
      ]
    });
    
    
}
get f() { return this.addExpensesCategoryForm.controls; }

addExpensesCategory(){
  this.submitted = true;
  if(this.addExpensesCategoryForm.valid){
  
    this.api.AddExpensesCategory(this.addExpensesCategoryForm.value).subscribe({
     
      next:(res)=>{
      
        this.dialogRef.close(res);   
      },
      error:(error)=>{
        if(error.error.error)
        {
          if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE)
          {
            this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_NAME_CAN_NOT_BE_BLANK_CODE)
          {
            this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_NAME_CAN_NOT_BE_BLANK_MESSAGE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_EXIST_ERROR_CODE)
            {
              this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_EXIST_MESSAGE)
            }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_EXPENSE_CATEGORY_MESSAGE)
          }
        }      
      }
     })
  }
}
}
