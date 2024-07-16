import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {
  addExpensesForm!: FormGroup;
  submitted = false;
  AllCategory: any[] = [];
  maxDate?: string;

  constructor(private formBuilder: FormBuilder, private api: ExpensesService, private http: HttpClient, private router: Router, private toastr: ToastrService, private constants: Constants) {
    this.SearchExpenseCategories();
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  SearchExpenseCategories() {

    this.api.searchExpensesCategory(1, '').subscribe({
      next: (res) => {
        if (res.data.length > 0) {
          this.AllCategory = res.data;
          console.log("category data-", res.data);
        }

        else {
          this.AllCategory = res.data;
          console.log("category data-", res.data);
        }
      },
      error: (error) => {
        if (error.error.error) {
          if (error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE) {
            this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS)
          }
          this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS)
        }
        this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS)
      }
    })
  }

  ngOnInit(): void {
    this.addExpensesForm = this.formBuilder.group({
      expenseCategoryId: ['', Validators.required],
      expenseDate: ['', Validators.required],
      amount: ['', Validators.required],
      expenseNote: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),whitespaceOnlyValidator()
        ]
      ]
    });
  }
  get f() { return this.addExpensesForm.controls; }

  addExpenses() {
    this.submitted = true;
    if (this.addExpensesForm.valid) {
      this.api.AddExpenses(this.addExpensesForm.value).subscribe({
        next: (res) => {

          this.toastr.success(this.constants.SuccessMessages.EXPENSE_SAVED_MESSAGE);
          this.router.navigate(['/expenses'])

        },
        error: (error) => {

          if (error.error.error) {
            if (error.error.error.code === this.constants.ErrorCodes.EXPENSE_DATE_CAN_NOT_BE_NULL_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.EXPENSE_DATE_CAN_NOT_BE_NULL_MESSAGE)
            }
            else if (error.error.error.code === this.constants.ErrorCodes.EXPENSE_AMOUNT_CAN_NOT_BE_NULL_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.EXPENSE_AMOUNT_CAN_NOT_BE_NULL_MESSAGE)
            }
            else if (error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_ID_CAN_NOT_BE_NULL_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_CAN_NOT_BE_NULL_MESSAGE)
            }
            else if (error.error.error.error.code === this.constants.ErrorCodes.EXPENSE_NOTE_CAN_NOT_BE_NULL_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.EXPENSE_NOTE_CAN_NOT_BE_NULL_MESSAGE)
            }
            else if (error.error.error.code === this.constants.ErrorCodes.EXPENSE_EXIST_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.EXPENSE_EXIST_MESSAGE)
            }
            else if (error.error.error.code === this.constants.ErrorCodes.FAILED_TO_SAVE_EXPENSE_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_EXPENSE_MESSAGE)
            }
            else {
              this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_EXPENSE_MESSAGE)
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