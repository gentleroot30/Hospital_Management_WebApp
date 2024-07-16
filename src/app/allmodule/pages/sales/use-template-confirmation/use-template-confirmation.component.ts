import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';

@Component({
  selector: 'app-use-template-confirmation',
  templateUrl: './use-template-confirmation.component.html',
  styleUrls: ['./use-template-confirmation.component.css']
})
export class UseTemplateConfirmComponent implements OnInit {


  constructor(public dialog: MatDialogRef<UseTemplateConfirmComponent>,@Inject(MAT_DIALOG_DATA) public data: { qci: number },
    private api : QuotationService, private router:Router
    ) { 
  }
  qcid: number = this.data.qci

  onNoClick(): void {
    this.dialog.close();
  }
  ngOnInit(): void {
  }


  onAddClick(id:number) {
   this.api.getQuotationTemplateById(id).subscribe({
    next:(res)=>{   
      
      this.dialog.close(res);
    }
   })
    }
}
