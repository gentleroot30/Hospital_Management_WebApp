import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { SalesReturnService } from 'src/app/allmodule/services/api_services/sales-return.service';

@Component({
  selector: 'app-delete-sale-return',
  templateUrl: './delete-sale-return.component.html',
  styleUrls: ['./delete-sale-return.component.css']
})
export class DeleteSaleReturnComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteSaleReturnComponent>,private api : SalesReturnService,
    private toastr:ToastrService, private constants:Constants,
    @Inject(MAT_DIALOG_DATA) public data: { salesId: number }) { }
  onNoClick(): void {
    this.dialogRef.close(DeleteSaleReturnComponent)
  }
  onDeleteClick(id: number): void {;
    this.api.deleteSalesReturns(id).subscribe({

      next: (res) => {
        
        this.dialogRef.close(res);
      },
      error: (error) => {
        if(error.error.error.code){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_SALES_RETRUN_DATA_ERROR_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_SALESRETURN_MESSAGE)
           }

        }
        this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_SALESRETURN_MESSAGE)
       
      }
    
    });
  }



  ngOnInit(): void {
  }

}
