import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-near-expiry-stock-order-success',
  templateUrl: './near-expiry-stock-order-success.component.html',
  styleUrls: ['./near-expiry-stock-order-success.component.css']
})
export class NearExpiryStockOrderSuccessComponent implements OnInit {
  dialogRef: any;
  constructor(public dialog: MatDialogRef<NearExpiryStockOrderSuccessComponent>) { }

  ngOnInit(): void {
  }
// Cancel the Dialog
onNoClick(): void {
  this.dialog.close(NearExpiryStockOrderSuccessComponent);
}
}
