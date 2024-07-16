import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-quotation-delete-success',
  templateUrl: './view-quotation-delete-success.component.html',
  styleUrls: ['./view-quotation-delete-success.component.css']
})
export class ViewQuotationDeleteSuccessComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialog1: MatDialogRef<ViewQuotationDeleteSuccessComponent>) { }


 onNoClick():void {
  this.dialog1.close(ViewQuotationDeleteSuccessComponent)
}
  ngOnInit(): void {
  }

}
