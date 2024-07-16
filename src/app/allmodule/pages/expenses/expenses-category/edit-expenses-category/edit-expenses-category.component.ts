import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-expenses-category',
  templateUrl: './edit-expenses-category.component.html',
  styleUrls: ['./edit-expenses-category.component.css']
})
export class EditExpensesCategoryComponent implements OnInit {
  editExpensesCategoryForm! : FormGroup;
  submitted = false;
  editdata: any;

  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<EditExpensesCategoryComponent>,
    private api:ExpensesService,private toastr:ToastrService,private constants:Constants,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      this.editdata=data;
     }
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    

    this.editExpensesCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required,
        Validators.pattern(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/),
        Validators.maxLength(20)]],
        description: [
        '',[           ]
      ]
    });

    this.api.getExpensesCategoryById(this.editdata).subscribe({
      next:(res)=>{
       
      this.editExpensesCategoryForm.controls['categoryName'].setValue(res.data.categoryName);
      this.editExpensesCategoryForm.controls['description'].setValue(res.data.description);
      },
      error:()=>{},
    })
  }
  get f() { return this.editExpensesCategoryForm.controls; }

  editExpensesCategory(){
    
    this.submitted = true;
    if(this.editExpensesCategoryForm.valid){
      this.api.updateExpensesCategory(this.editdata,this.editExpensesCategoryForm.value).subscribe({
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
            else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_EXPENSE_CATEGORY_CODE)
            {
              this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_EXPENSE_CATEGORY_DATA_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_EXIST_ERROR_CODE)
            {
              this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_EXIST_MESSAGE)
            }
            else {
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATED_EXPENSE_CATEGORY_MESSAGE)
            }
          }
        }
        
    })
  }
}
}


export function whitespaceOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      // Check if the input consists only of whitespace characters
      if (control.value && control.value.trim().length === 0) {
          // Return a validation error object if the input is only whitespace
          return { whitespaceOnly: true };
      }
      // Return null if the input is valid
      return null;
  };
}