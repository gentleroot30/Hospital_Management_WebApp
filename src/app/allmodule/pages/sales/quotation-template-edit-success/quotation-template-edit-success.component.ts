import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quotation-template-edit-success',
  templateUrl: './quotation-template-edit-success.component.html',
  styleUrls: ['./quotation-template-edit-success.component.css']
})
export class QuotationTemplateEditSuccessComponent implements OnInit {

  constructor(public dialog1: MatDialogRef<QuotationTemplateEditSuccessComponent>) { }

  ngOnInit(): void {
  }
  onNoClick():void {
    this.dialog1.close(QuotationTemplateEditSuccessComponent)
  }
}
