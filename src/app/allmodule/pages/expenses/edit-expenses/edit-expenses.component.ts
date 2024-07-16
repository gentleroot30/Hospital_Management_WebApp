import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-expenses',
  templateUrl: './edit-expenses.component.html',
  styleUrls: ['./edit-expenses.component.css']
})
export class EditExpensesComponent implements OnInit {
  editExpensesForm!: FormGroup;
  submitted = false;
  expenseData:any[]=[]
  expenseId: any=0;
  AllCategory:any[]=[];
  maxDate? :string;

  constructor(private formBuilder:FormBuilder,private api:ExpensesService,private activeRouter:ActivatedRoute,
    private route:Router, private toastr: ToastrService, private constants: Constants) {
      this.SearchExpenseCategories()
      const today = new Date();
      this.maxDate = today.toISOString().split('T')[0];
     }

  ngOnInit(): void {
    
    this.expenseId = this.activeRouter.snapshot.queryParams['expenseId']

    this.editExpensesForm = this.formBuilder.group({
     
		  expenseCategoryId: ['',Validators.required],
      amount: ['',Validators.required],
      expenseDate: ['',Validators.required],
      expenseNote: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),whitespaceOnlyValidator()
        ]
      ]
    });
    this.api.getExpensesById(this.expenseId).subscribe({
      next:(res)=>{
         
          this.editExpensesForm.controls['expenseCategoryId'].setValue(res.data.categoryId);
          this.editExpensesForm.controls['amount'].setValue(res.data.amount);
       // this.editExpensesForm.controls['expenseDate'].setValue(res.data.expenseDate);
        const formattedDate = this.formatDate(res.data.expenseDate);
        this.editExpensesForm.controls['expenseDate'].setValue(formattedDate);
          this.editExpensesForm.controls['expenseNote'].setValue(res.data.expenseNote);
      },
      error:(err)=>{
        this.toastr.error(this.constants.Messages.EXPENSE_ID_DOES_NOT_EXISTS);
      }
    }) 
  }
  formatDate(dateString: string): string {
    let newDate = new Date(dateString);
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
  
    return formattedDate;
}
  SearchExpenseCategories() {
    
    this.api.searchExpensesCategory(1,'').subscribe({
      next:(res)=>{
        if(res.data.length>0){
          this.AllCategory=res.data;  
        }

        else{
          this.AllCategory= res.data;
       
         
        }
      },
      error:(error)=>{
      if(error.error.error){
        if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE){
          this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS)
        }
        this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS)
      }
      this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS)
      }
     })
  } 
 

  get f() { return this.editExpensesForm.controls; }

  editExpense(){
    this.submitted = true
    if(this.editExpensesForm.valid){
      
      this.api.updateExpenses(this.expenseId,this.editExpensesForm.value).subscribe({
        next:(res)=>{
          
          this.toastr.success(this.constants.SuccessMessages.EXPENSES_UPDATED_MESSAGE);
          this.route.navigate(['/expenses']);
        },
        error:(error)=>{

          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_DATE_CAN_NOT_BE_NULL_ERROR_CODE){
              this.toastr.error(this.constants.Messages.EXPENSE_DATE_CAN_NOT_BE_NULL_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.  FAILED_TO_UPDATE_EXPENSE_ERROR_CODE){
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATED_EXPENSE_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_AMOUNT_CAN_NOT_BE_NULL_ERROR_CODE){
              this.toastr.error(this.constants.Messages.EXPENSE_AMOUNT_CAN_NOT_BE_NULL_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_ID_CAN_NOT_BE_NULL_ERROR_CODE){
              this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_CAN_NOT_BE_NULL_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.EXPENSE_EXIST_ERROR_CODE)
            {
              this.toastr.error(this.constants.Messages.EXPENSE_EXIST_MESSAGE)
            }
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_UPDATED_EXPENSE_MESSAGE)
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