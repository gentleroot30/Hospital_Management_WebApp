import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-quotation-success',
  templateUrl: './edit-quotation-success.component.html',
  styleUrls: ['./edit-quotation-success.component.css']
})
export class EditQuotationSuccessComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialog1: MatDialogRef<EditQuotationSuccessComponent>) { }
  onNoClick():void {
    this.dialog1.close(EditQuotationSuccessComponent)
  }
  ngOnInit(): void {
  }

}
