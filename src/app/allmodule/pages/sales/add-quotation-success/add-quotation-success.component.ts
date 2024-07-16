import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-quotation-success',
  templateUrl: './add-quotation-success.component.html',
  styleUrls: ['./add-quotation-success.component.css']
})
export class AddQuotationSuccessComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialog1: MatDialogRef<AddQuotationSuccessComponent>) { }
  onNoClick():void {
    this.dialog1.close(AddQuotationSuccessComponent)
  }
  ngOnInit(): void {
  }

}
