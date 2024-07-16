import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewQuotationDeleteComponent } from '../view-quotation-delete/view-quotation-delete.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/allmodule/services/api_services/sales.service';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';

export interface PeriodicElement {
  Product_Name: string;
  Slno: number;
  Quantity: string;
  Amount:number;
  Current_Stock:number;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.css']
})
export class ViewQuotationComponent implements OnInit {
  viewQuotationForm!: FormGroup;
  quotationId:number = 0;
  products:any[]=[];
  allProducts:any[]=[];
  selectedFile: File | null = null;
  fileCount: number = 0;
  templateProducts:any[]=[];
  allCustomer:any[]=[];
  file: File | null = null;
  documents:any[]=[];
  files: FileList | null = null;
// Final import for expand Notes Tab

isExpanded1: boolean = false;
isExpanded2: boolean = false;
isExpanded3: boolean = false;
isExpanded4: boolean = false;
  dialogRef: any;



toggleExpandAddNF() {
  this.isExpanded1 = !this.isExpanded1;
}

toggleExpandNotes() {
  this.isExpanded2 = !this.isExpanded2;
}

toggleExpandNotes2() {
  this.isExpanded3 = !this.isExpanded3;
}

toggleExpandTable() {
  this.isExpanded4 = !this.isExpanded4;
}

displayedColumns: string[] = [ 'productName', 'customField1', 'customField2', 'customField3'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  constructor( public dialog: MatDialog,private formBuilder: FormBuilder,
    private api:SalesService, 
    private router:Router,private http:HttpClient,
    private productApi: QuotationService,
    private customerApi:CustomersService,
    private acivateRouter: ActivatedRoute) {
     
     }

  ViewQuotationDelete() {
    this.dialog.open(ViewQuotationDeleteComponent,{
      width:'607px',height:'350px',
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }   

  ngOnInit(): void {
    this.quotationId = this.acivateRouter.snapshot.queryParams['quotationId']
    this.viewQuotationForm = this.formBuilder.group({
      quotationId:[''],
      customerName: ['', ],
      quotationNo:['',],
      quotationDate:['',],
      new_Field_1:['',],
      new_Field_2:[''],
      new_Field_3:[''],
      new_Field_4:[''],
      new_Field_5:[''],
      new_Field_6:[''],
      new_Field_7:[''],
      sale_Note_1:[''],
      sale_Note_2:[''],
      sale_Note_3:[''],
      sale_Note_4:[''],
      file: [''],
    })

    this.api.getQuotationById(this.quotationId).subscribe({
      next: (res)=>{
        this.viewQuotationForm.controls['quotationId'].setValue(res.data.quotationId),
        this.viewQuotationForm.controls['customerName'].setValue(res.data.customerName),
        this.viewQuotationForm.controls['quotationNo'].setValue(res.data.quotationNo);
        const formattedDate = this.formatDate(res.data.quotationDate);
        this.viewQuotationForm.controls['quotationDate'].setValue(formattedDate);
        this.viewQuotationForm.controls['new_Field_1'].setValue(res.data.new_Field_1),
        this.viewQuotationForm.controls['new_Field_2'].setValue(res.data.new_Field_2),
        this.viewQuotationForm.controls['new_Field_3'].setValue(res.data.new_Field_3),
        this.viewQuotationForm.controls['new_Field_4'].setValue(res.data.new_Field_4),
        this.viewQuotationForm.controls['new_Field_5'].setValue(res.data.new_Field_5),
        this.viewQuotationForm.controls['new_Field_6'].setValue(res.data.new_Field_6),
        this.viewQuotationForm.controls['new_Field_7'].setValue(res.data.new_Field_7),
        this.viewQuotationForm.controls['sale_Note_1'].setValue(res.data.sale_Note_1),
        this.viewQuotationForm.controls['sale_Note_2'].setValue(res.data.sale_Note_2),
        this.viewQuotationForm.controls['sale_Note_3'].setValue(res.data.sale_Note_3),
        this.viewQuotationForm.controls['sale_Note_4'].setValue(res.data.sale_Note_4)
        this.products = res.data.products;
        this.dataSource = new MatTableDataSource < PeriodicElement > (this.products); 
        this.documents = res.data.documents;
         
        this.setFilesToDiv();
      
      

      }
    })

  }
  formatDate(dateString: string): string {
    let newDate = new Date(dateString);
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
  
    return formattedDate;
}

  downloadDocument(event: Event) {
    let clickedElementId = (event.currentTarget as HTMLElement).id;
   
    
      // call document download api 
      
     
  }

  setFilesToDiv(){  
 
    const thumbnailList = document.getElementById('selectFiles');
   
    if (this.documents && this.documents.length > 0) {
      this.fileCount += Array.from(this.documents).length;
        for (const file of Array.from(this.documents)) {
            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.className = 'thumbnails';
            thumbnailContainer.id = file.documentId;
            thumbnailContainer.addEventListener("click", this.downloadDocument);
            let fileName = file.documentName;
           
            let arr = fileName.split('.');
            if (arr[0].length > 10)
              fileName = arr[0].slice(0, 10) + '...' + arr[1];
            let spn = document.createElement('span');
            spn.innerText = fileName;
            thumbnailContainer.appendChild(spn);
            if (file.documentType == '1') {
              thumbnailContainer.innerHTML = '<i class="fa-solid fa-image" style="font-size:130px;color:red"></i>';

              thumbnailContainer.prepend(spn);
            } else if (file.documentType == '2') {
              // Display PDF symbol
              thumbnailContainer.innerHTML = '<i class="fa fa-file-pdf-o" style="font-size:130px;color:red"></i>';
              thumbnailContainer.prepend(spn);
            } else {
              thumbnailContainer.innerHTML = '<i class="fa-solid fa-file "style="font-size:150px;color:red"></i>'
              thumbnailContainer.prepend(spn);
            }
            
            if (thumbnailList)
              thumbnailList.appendChild(thumbnailContainer);
           
        }
       
    }

  }
 

}
