import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareComponent } from './share/share.component';

@Component({
  selector: 'app-purchase-document',
  templateUrl: './purchase-document.component.html',
  styleUrls: ['./purchase-document.component.css']
})
export class PurchaseDocumentComponent implements OnInit {

  constructor(public dialogRef: MatDialog) {}

  ngOnInit(): void {
  }
  share(){
    this.dialogRef.open( ShareComponent,{
      width:'600px',
      height:"250px",
    });
  }
}
