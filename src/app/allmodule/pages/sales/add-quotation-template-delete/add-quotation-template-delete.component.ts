import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-quotation-template-delete',
  templateUrl: './add-quotation-template-delete.component.html',
  styleUrls: ['./add-quotation-template-delete.component.css']
})
export class AddQuotationTemplateDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddQuotationTemplateDeleteComponent>,
    private api:QuotationService, private constants:Constants,private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { qci: number }) { }
    qcid :number =this.data.qci 
  ngOnInit(): void {
    
  }
// Cancel the Dialog
onNoClick(): void {
  this.dialogRef.close();
}

onDeleteClick(id:number): void {
 
  this.api.deleteQuotationTemplate(id).subscribe({
  
    next: (res) => {
      
      this.dialogRef.close(res);
},
    error: (error) => { 
      if(error.error.error){
        if(error.error.erro.code === this.constants.ErrorCodes.FAILED_TO_DELETE_QUOTATION_TEMPLATE_DATA_ERROR_CODE){
          this.toaster.error(this.constants.Messages.FAILED_TO_DELETE_QUOTATION_TEMPLATE_MESSAGE)
        }
      }
      this.toaster.error(this.constants.Messages.FAILED_TO_DELETE_QUOTATION_TEMPLATE_MESSAGE)
    }
  });
}
}
