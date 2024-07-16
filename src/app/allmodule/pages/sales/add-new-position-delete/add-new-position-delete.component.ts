import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-position-delete',
  templateUrl: './add-new-position-delete.component.html',
  styleUrls: ['./add-new-position-delete.component.css']
})
export class AddNewPositionDeleteComponent implements OnInit {
  dialogRef: any;
  constructor(public dialog: MatDialogRef<Dialog>) { }

  ngOnInit(): void {
  }
// Cancel the Dialog
onNoClick(): void {
  this.dialog.close();
}
}
