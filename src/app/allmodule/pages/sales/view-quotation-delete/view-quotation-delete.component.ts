import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ViewQuotationDeleteSuccessComponent } from '../view-quotation-delete-success/view-quotation-delete-success.component';

@Component({
  selector: 'app-view-quotation-delete',
  templateUrl: './view-quotation-delete.component.html',
  styleUrls: ['./view-quotation-delete.component.css']
})
export class ViewQuotationDeleteComponent implements OnInit {

  constructor(public dialog1: MatDialogRef<ViewQuotationDeleteComponent>,public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  viewquotaionDeleteSuccessDialog(){
    this.dialog.open(ViewQuotationDeleteSuccessComponent,{
      width:'607px',height:'270px'
    });
 }
  onNoClick(): void {
    this.dialog1.close(ViewQuotationDeleteComponent)
  }

}
