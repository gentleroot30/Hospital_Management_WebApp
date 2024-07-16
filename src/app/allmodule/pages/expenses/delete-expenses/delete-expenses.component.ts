import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-delete-expenses',
  templateUrl: './delete-expenses.component.html',
  styleUrls: ['./delete-expenses.component.css']
})
export class DeleteExpensesComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<DeleteExpensesComponent>,private api:ExpensesService,private toastr: ToastrService, private constants: Constants,  
    @Inject(MAT_DIALOG_DATA) public data: { cid: number }) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    
    deleteExpense(expenseId:number): void {
      
      this.api.DeleteExpenses(expenseId).subscribe({
      
        next: (res) => {
        
          this.dialogRef.close(res);
    },
        error: (error) => {
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_EXPENSE_ERROR_CODE){
              this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_EXPENSE_MESSAGE)
            }
            else{
              this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_EXPENSE_MESSAGE)
             }
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_EXPENSE_MESSAGE)
          }
      }
        
      });
    }

  ngOnInit(): void {
  }

}
