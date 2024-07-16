import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-low-stock-order-success',
  templateUrl: './low-stock-order-success.component.html',
  styleUrls: ['./low-stock-order-success.component.css']
})
export class LowStockOrderSuccessComponent implements OnInit {
  dialogRef: any;
  constructor(public dialog: MatDialogRef<LowStockOrderSuccessComponent>) { }

  ngOnInit(): void {
  }
// Cancel the Dialog
onNoClick(): void {
  this.dialog.close(LowStockOrderSuccessComponent);
}
}
