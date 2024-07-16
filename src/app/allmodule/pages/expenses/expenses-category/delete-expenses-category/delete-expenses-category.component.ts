import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteCustomerComponent } from '../../../customers/delete-customer/delete-customer.component';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';

@Component({
  selector: 'app-delete-expenses-category',
  templateUrl: './delete-expenses-category.component.html',
  styleUrls: ['./delete-expenses-category.component.css']
})
export class DeleteExpensesCategoryComponent implements OnInit {

  @Input()
  cci!: number;
  constructor(public dialogRef: MatDialogRef<DeleteExpensesCategoryComponent>,
    private api: ExpensesService,private toastr:ToastrService,private constants:Constants,
    @Inject(MAT_DIALOG_DATA) public data: { cci: number }) { }
  ccid: number = this.data.cci


  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(id: number): void {

    this.api.deleteExpensesCategory(id).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (error) => {
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_EXPENSE_CATEGORY_ERROR_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_EXPENSE_CATEGORY_MESSAGE)
          }
          else{
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_EXPENSE_CATEGORY_MESSAGE)
           }
        }
        else {
          this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_EXPENSE_CATEGORY_MESSAGE)
        }
    }
      
    });
  }

  ngOnInit(): void {
  }

}
