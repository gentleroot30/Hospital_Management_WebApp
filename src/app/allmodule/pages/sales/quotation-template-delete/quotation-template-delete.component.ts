import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-quotation-template-delete',
  templateUrl: './quotation-template-delete.component.html',
  styleUrls: ['./quotation-template-delete.component.css']
})
export class QuotationTemplateDeleteComponent implements OnInit {

  constructor(public dialog: MatDialogRef<QuotationTemplateDeleteComponent>, private api: QuotationService,
    private constants:Constants, private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { qci: number }
  ) { }
  qcid: number = this.data.qci
  ngOnInit(): void {

  }
  // Cancel the Dialog
  onNoClick(): void {
    this.dialog.close(QuotationTemplateDeleteComponent);
  }
  onDeleteClick(id: number): void {

    this.api.deleteQuotationTemplate(id).subscribe({
      next: (res) => {
        this.dialog.close(res);
      },
      error: (error) => {
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_QUOTATION_TEMPLATE_DATA_ERROR_CODE){
            this.toaster.error(this.constants.Messages.FAILED_TO_DELETE_QUOTATION_TEMPLATE_MESSAGE)
          }
          this.toaster.error(this.constants.Messages.FAILED_TO_DELETE_QUOTATION_TEMPLATE_MESSAGE)
        }
        this.toaster.error(this.constants.Messages.FAILED_TO_DELETE_QUOTATION_TEMPLATE_MESSAGE)
      }
    });
  }
}
