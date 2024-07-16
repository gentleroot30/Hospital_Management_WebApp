import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewQuotationDeleteComponent } from '../view-quotation-delete/view-quotation-delete.component';
import { Toast, ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { SalesService } from 'src/app/allmodule/services/api_services/sales.service';

@Component({
  selector: 'app-delete-quotation',
  templateUrl: './delete-quotation.component.html',
  styleUrls: ['./delete-quotation.component.css']
})
export class DeleteQuotationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteQuotationComponent>,private api : SalesService,
    private toastr:ToastrService, private constants:Constants,
    @Inject(MAT_DIALOG_DATA) public data: { qci: number }) { }

    qcid: number = this.data.qci

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(DeleteQuotationComponent)
  }
  onDeleteClick(id: number): void {;
    this.api.deleteQuotation(id).subscribe({

      next: (res) => {
        
        this.dialogRef.close(res);
      },
      error: (error) => {
        if(error.error.error.code){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_QUOTATION_DATA_ERROR_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_QUOTATION_MESSAGE)
           }

        }
        this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_QUOTATION_MESSAGE)
       
      }
    
    });
  }
}
