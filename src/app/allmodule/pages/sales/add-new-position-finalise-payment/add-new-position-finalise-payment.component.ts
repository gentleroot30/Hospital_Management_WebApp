import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

export interface PeriodicElement {
  Product_Name: string;
  Slno: number;
  Quantity: string;
  Amount:number;
  Current_Stock:number;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Slno: 1, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '549.00', Amount:500,Current_Stock: 100,Action:''},
  {Slno: 2, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '845.00',Amount:400,Current_Stock: 100,Action:''},
  {Slno: 3, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '648.00',Amount:600,Current_Stock: 100,Action:''},
  {Slno: 4, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '648.00',Amount:750,Current_Stock: 100,Action:''},
  {Slno: 5, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '984.00',Amount:800,Current_Stock: 100,Action:''},
  {Slno: 6, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '1250.00',Amount:1000,Current_Stock: 100,Action:''},
  {Slno: 7, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '1698.00',Amount:1200,Current_Stock: 100,Action:''},
  {Slno: 8, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '1945.00',Amount:1550,Current_Stock: 100,Action:''},
  {Slno: 9, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity: '6845.00',Amount:2800,Current_Stock: 100,Action:''},
  {Slno: 10, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .',  Quantity : '12365.00',Amount:3500,Current_Stock: 100,Action:''},
];
   


@Component({
  selector: 'app-add-new-position-finalise-payment',
  templateUrl: './add-new-position-finalise-payment.component.html',
  styleUrls: ['./add-new-position-finalise-payment.component.css']
})
export class AddNewPositionFinalisePaymentComponent implements OnInit {
  dialogRef: any;

  displayedColumns: string[] = ['Slno', 'Product_Name','Quantity','Amount','Current_Stock','Action'];
  dataSource = ELEMENT_DATA;
  constructor(private clipboard: Clipboard,public dialog: MatDialogRef<AddNewPositionFinalisePaymentComponent>) { }

  copyLink() {
    const linkText = document.getElementById('linkText');
    
    if (linkText) {
      const link = linkText.innerText;
      this.clipboard.copy(link);
      alert('Link copied to clipboard: ' + link);
    }
  }

  ngOnInit(): void {
  }
// Cancel the Dialog
onNoClick(): void {
  this.dialog.close(AddNewPositionFinalisePaymentComponent);
}
}
