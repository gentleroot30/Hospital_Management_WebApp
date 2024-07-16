import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-expired-stock-order-success',
  templateUrl: './expired-stock-order-success.component.html',
  styleUrls: ['./expired-stock-order-success.component.css']
})
export class ExpiredStockOrderSuccessComponent implements OnInit {
  dialogRef: any;
  constructor(public dialog: MatDialogRef<ExpiredStockOrderSuccessComponent>) { }

  ngOnInit(): void {
  }
// Cancel the Dialog
onNoClick(): void {
  this.dialog.close(ExpiredStockOrderSuccessComponent);
}
}
