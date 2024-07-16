import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-quotation-template-success',
  templateUrl: './add-quotation-template-success.component.html',
  styleUrls: ['./add-quotation-template-success.component.css']
})
export class AddQuotationTemplateSuccessComponent implements OnInit {
  dialogRef: any;
  constructor(public dialog: MatDialogRef<AddQuotationTemplateSuccessComponent>) { }

  ngOnInit(): void {
  }
// Cancel the Dialog
onNoClick(): void {
  this.dialog.close(AddQuotationTemplateSuccessComponent);
}
}
