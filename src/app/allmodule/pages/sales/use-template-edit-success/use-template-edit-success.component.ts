import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-use-template-edit-success',
  templateUrl: './use-template-edit-success.component.html',
  styleUrls: ['./use-template-edit-success.component.css']
})
export class UseTemplateEditSuccessComponent implements OnInit {

  constructor(public dialog: MatDialog,public dialog2: MatDialogRef<UseTemplateEditSuccessComponent>) { }

  ngOnInit(): void {
  }
  // Cancel the Dialog
onNoClick(): void {
  
  this.dialog2.close(UseTemplateEditSuccessComponent);
  
}

}
