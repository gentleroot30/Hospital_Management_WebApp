import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

export interface PeriodicElement {
  Product_Name: string;
  Slno: number;
  Quantity: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Slno: 1, Product_Name: '',  Quantity: ''},
  {Slno: 2, Product_Name: '',  Quantity: ''},
  {Slno: 3, Product_Name: '',  Quantity: ''},
  {Slno: 4, Product_Name: '',  Quantity: ''},
  {Slno: 5, Product_Name: '',  Quantity: ''},
 
];

@Component({
  selector: 'app-add-purchase-order-submit',
  templateUrl: './add-purchase-order-submit.component.html',
  styleUrls: ['./add-purchase-order-submit.component.css']
})
export class AddPurchaseOrderSubmitComponent implements OnInit {




  downloadFile() {
    // Replace this with the actual download URL ts file
    const downloadUrl = 'https://example.com/path/to/your/file.pdf';

    // Create a temporary link element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = 'your_file_name.pdf'; // Set the desired file name
    downloadLink.click();
  }

  dialogRef: any;

  displayedColumns: string[] = ['Slno', 'Product_Name','Quantity'];
  dataSource = ELEMENT_DATA;
  constructor(private clipboard: Clipboard,public dialog: MatDialogRef<AddPurchaseOrderSubmitComponent>) { }

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
  this.dialog.close(AddPurchaseOrderSubmitComponent);
}
}
