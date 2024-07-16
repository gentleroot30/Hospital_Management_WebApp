import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-use-template-delete-success',
  templateUrl: './use-template-delete-success.component.html',
  styleUrls: ['./use-template-delete-success.component.css']
})
export class UseTemplateDeleteSuccessComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialog1: MatDialogRef<UseTemplateDeleteSuccessComponent>) { }
  onNoClick():void {
    this.dialog1.close(UseTemplateDeleteSuccessComponent)
  }
  ngOnInit(): void {
  }

}
