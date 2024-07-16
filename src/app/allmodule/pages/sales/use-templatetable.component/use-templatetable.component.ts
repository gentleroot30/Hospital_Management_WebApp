import { Component, EventEmitter, Output,Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AddQuotationComponent } from '../add-quotation/add-quotation.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuotationService } from '../../../services/api_services/quotation-template.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';



@Component({
  templateUrl: './use-template-table.component.html',
  styleUrls: ['./use-template-table.component.css']
})
export class UseTemplateTableComponent implements OnInit {
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  addQuotationComponent: AddQuotationComponent;
  
  randomString: string | null = null;
  imageUrl: string = '';
  // @ViewChild(AddQuotationComponent, { static: false }) addQuotationComponent!: AddQuotationComponent;
  @ViewChild('tableToCapture', { static: true }) tableToCapture!: ElementRef<HTMLTableElement>;
  displayedColumns: string[] = ['productId', 'productName', 'customField1'];
  dataSource = this.data.products.map(product => ({ ...product }));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { products: any[], addQuotationComponent: AddQuotationComponent },
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UseTemplateTableComponent>,
    private toastr: ToastrService,
    private http: HttpClient,
    private quotationService: QuotationService,
    private router: Router,
    private constants: Constants,
    private toaster: ToastrService 
    
     
  ) { 
      this.addQuotationComponent = data.addQuotationComponent;
  }

  ngOnInit(): void {
    this.dataSource = this.data.products;
    this.randomString = uuidv4();
    if (this.randomString) {
      this.imageUrl = `#${this.randomString}`; 
    }
    this.dialogRef.backdropClick().subscribe(() => {
      this.onCloseClick();
    });
   
  }
  
  downloadTable(): void {
    const header = document.querySelector('.header');
    const table = document.querySelector('.mat');
  
    if (header instanceof HTMLElement && table instanceof HTMLElement) {
      header.classList.add('black-and-white');
      table.classList.add('black-and-white');
  
      Promise.all([
        html2canvas(header, { backgroundColor: '#ffffff', scale: 2 }),
        html2canvas(table, { backgroundColor: '#ffffff', scale: 2 })
      ]).then(([headerCanvas, tableCanvas]) => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(headerCanvas.width, tableCanvas.width);
        canvas.height = headerCanvas.height + tableCanvas.height;
        const context = canvas.getContext('2d');
  
        if (context) {
          context.fillStyle = '#ffffff'; // Set background color to white
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(headerCanvas, 0, 0);
          context.drawImage(tableCanvas, 0, headerCanvas.height);
  
          const imageData = canvas.toDataURL('image/png');
          const doc = new jsPDF();
          const imgWidth = 210; // Width of A4 page in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width; 
  
          
          const padding = 10;
          const xPos = padding;
          const yPos = padding;
          const imageWidth = imgWidth - (2 * padding);
          const imageHeight = imgHeight - (1 * padding);
  
          doc.addImage(imageData, 'PNG', xPos, yPos, imageWidth, imageHeight);
          doc.save('receipt.pdf');
        }
      });
    }
  }

  async copyLink(): Promise<void> {
    const imageData = await this.getImageData();
    if (!imageData) {
      console.error('Image data is empty');
      return;
    }

    // Upload image data to the server
    const uploadUrl = await this.uploadImage(imageData);
    if (uploadUrl) {
      const input = document.createElement('input');
      input.setAttribute('value', uploadUrl);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);

      
      this.toastr.success('Link copied to clipboard!');
    } else {
      this.toastr.error('Failed to upload image');
    }
  }

  async getImageData(): Promise<string | null> {
    const header = document.querySelector('.header');
    const table = document.querySelector('.mat');

    if (header instanceof HTMLElement && table instanceof HTMLElement) {
      header.classList.add('black-and-white');
      table.classList.add('black-and-white');

      try {
        const [headerCanvas, tableCanvas] = await Promise.all([
          html2canvas(header, { backgroundColor: '#ffffff' }),
          html2canvas(table, { backgroundColor: '#ffffff' })
        ]);

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(headerCanvas.width, tableCanvas.width);
        canvas.height = headerCanvas.height + tableCanvas.height;
        const context = canvas.getContext('2d');

        if (context) {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(headerCanvas, 0, 0);
          context.drawImage(tableCanvas, 0, headerCanvas.height);

          return canvas.toDataURL('image/png');
        }
      } catch (error) {
        console.error('Error capturing header and table image:', error);
        return null;
      }
    }

    return null;
  }

  async uploadImage(dataUrl: string): Promise<string | null> {
    const blob = this.dataURLToBlob(dataUrl);
    const formData = new FormData();
    formData.append('file', blob, 'image.png');

    try {
      const response: any = await this.http.post('https://localhost:44379/api/Upload/upload', formData).toPromise();
      return response.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  dataURLToBlob(dataUrl: string): Blob {
    const parts = dataUrl.split(';base64,');
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

  printTable(): void {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Table Print</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body {
          font-family: Arial, sans-serif;
          text-align: center;
        }
        .header-image {
          width: 50%;
          max-width: 600px;
          height: 100px;
          margin-bottom: 20px;
          
        }
        .table-header {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        table {
          
          width: 50%;
          border-collapse: collapse;
          margin: 0 auto;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
          font-size: 12px;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
  
      // Add the header image
      printWindow.document.write('<div class="header">');
      printWindow.document.write('<img src="assets/images/headerr.jpg" alt="Header Image" class="header-image">');
      printWindow.document.write('</div>');
  
      // Add a header for the table
      printWindow.document.write('<div class="table-header">Table Print</div>');
  
      // Add the table
      printWindow.document.write('<table>');
      const tableRows = document.querySelectorAll('.mat tr');
      tableRows.forEach(row => {
        printWindow.document.write('<tr>');
        const cells = row.querySelectorAll('td, th');
        cells.forEach(cell => {
          const element = cell as HTMLElement;
          printWindow.document.write(`<${element.tagName.toLowerCase()}>${element.innerText}</${element.tagName.toLowerCase()}>`);
        });
        printWindow.document.write('</tr>');
      });
      printWindow.document.write('</table>');
  
      printWindow.document.write('</body></html>');
  
      // Close the document and initiate printing
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window');
    }
  }
  onCloseClick(): void {
    
    this.closeDialog.emit();
    this.dialogRef.close();
    this.addQuotationComponent.addQuotation();
    this.toaster.success(this.constants.SuccessMessages.QUOTATION_SAVED_MESSAGE)
    this.router.navigateByUrl('/sales');
  }
}

