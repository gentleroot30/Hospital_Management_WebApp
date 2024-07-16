import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PurchaseReturnService } from 'src/app/allmodule/services/api_services/purchase-return.service';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';
import { Constants } from 'src/app/app.constants';


@Component({
  selector: 'app-delete-purchases-returns',
  templateUrl: './delete-purchases-returns.component.html',
  styleUrls: ['./delete-purchases-returns.component.css']
})
export class DeletePurchasesReturnsComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeletePurchasesReturnsComponent>, private api: PurchaseReturnService,
    @Inject(MAT_DIALOG_DATA) public data: { rid: number },private constants:Constants,private toaster:ToastrService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  deletePurchasesReturns(returnid: number): void {
    debugger
    this.api.DeletePurchaseReturn(returnid).subscribe({

      next: (res) => {

        this.dialogRef.close(res);
      },
      error: (error) => {
        if (error.error.error) {
          if (error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_PURCHASE_RETURN_DATA_ERROR_CODE) {
            this.toaster.error(this.constants.Messages.FAILED_TO_DELETE_PURCHASE_RETURN_MESSAGE)
          }
        }
      }

    })
  }
}   
