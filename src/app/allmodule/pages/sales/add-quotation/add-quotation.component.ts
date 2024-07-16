import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UseTemplateComponent } from '../use-template/use-template.component';

import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs';
import { data, event } from 'jquery';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { DataSource } from '@angular/cdk/collections';
import { SalesService } from 'src/app/allmodule/services/api_services/sales.service';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { UseTemplateTableComponent } from '../../sales/use-templatetable.component/use-templatetable.component';



export interface PeriodicElement {
  PN: number;
  DateandTime: string;
  SupplierName: string;
  Status: string;
  AddedBy: string;
}

interface Options3 {
  value: string;
  viewValue: string;
}

export interface fileUploadData {
  file: File | null;
  documentTypes: number;
  quotationId: number;
}


const ELEMENT_DATA: PeriodicElement[] = []


@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.css']
})
export class AddQuotationComponent implements OnInit {
  addQuotationForm!: FormGroup;
  submitted = false;
  selectedFile: File | null = null;
  files:  any[]=[];
  fileCount: number = 0;
  quotationId:number = 0;
  uploadStatus: string = '';
  upload: string = '';
  displayedColumns: string[] = ['productName', 'customField1', 'customField2', 'customField3', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  Options3: Options3[] = [
    { value: 'Supplier Name', viewValue: 'Supplier Name' },
    { value: 'PN', viewValue: 'PN' },
  ];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  products: any[] = [];
  allCustomer: any[] = [];
  dialogRef: any;
  file: File | null = null;
  tableData:any[]=[]
  toastr: any;
  // showPopup: boolean = false; // Add this line
  showTable: boolean = false;


  Redirect() {
    this.router.navigate(['/sales'])
  }
  constructor(

    // private childComponent: UseTemplateTableComponent,

    private formBuilder: FormBuilder,
    private api: SalesService,
    private router: Router,
    public dialog: MatDialog, 
    private productApi: QuotationService,
    private toaster: ToastrService,
    private customerApi: CustomersService,
    private constants: Constants,
    
  ) {

    this.loadCustomers();
    this.getProductList();

  }

  formData = {
    searchByType: 1,
    searchByValue: '',
  }
  fileData = {
    documentType: 1,
  }
  myControl = new FormControl('');
  customers: any[] = [];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit(): void {
    this.addQuotationForm = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      quotationDate: ['', [Validators.required]],
      newField1: ['', [ Validators.pattern(/^\d*\.?\d*$/)]],
      newField2: ['',[Validators.pattern(/^\d*\.?\d*$/)]],
      newField3: ['',[Validators.pattern(/^\d*\.?\d*$/)]],
      newField4: ['',[Validators.pattern(/^\d*\.?\d*$/)]],
      newField5: ['',[Validators.pattern(/^\d*\.?\d*$/)]],
      newField6: ['',[Validators.pattern(/^\d*\.?\d*$/)]],
      newField7: ['',[Validators.pattern(/^\d*\.?\d*$/)]],
      newField8: [''],
      saleNote1: [''],
      saleNote2: [''],
      saleNote3: [''],
      saleNote4: [''],
      file: [''],
    
    })

  }


  useTemplate() {
    this.dialog.open(UseTemplateComponent, {
      width: '1037px', height: '617px',
    }).afterClosed().subscribe((res) => {
      this.templateProducts = res.data.quotationTempProducts;
      if (res.data.quotationTempProducts){
        for (var templateProduct of this.templateProducts) {
          for (var product of this.allProducts) {
            if (templateProduct.productId == product.productId) {
              this.allProducts = this.allProducts.filter(p => p !== product);
              
            }
          }
        }
      }
      
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
      
    })

  }
  // downloadTable() {
  //   this.childComponent.downloadTable(); // Assuming downloadTable exists in the child component
  // }
  

  openTemplateTable() {
    this.dialogRef = this.dialog.open(UseTemplateTableComponent, {
      width: '607px',
      height: '657px',
      data: { products: this.templateProducts, addQuotationComponent: this } 
    });
  }


  loadCustomers() {

    this.customerApi.SearchCustomer(1, '').subscribe({
      next: (res) => {
        if (res.data.length > 0) {
          this.allCustomer = res.data;
        }

      
      },
      error: (error) => {
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_CUSTOMER_DATA_ERROR_CODE){
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_DATA_MESSAGE)
          }
          else{
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_DATA_MESSAGE)
          }
        }
        else{
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_DATA_MESSAGE)
        }
      }
    })
  }


  getProductList() {
    this.productApi.getProducts(this.formData.searchByType, this.formData.searchByValue).subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (error) => {
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_PRODUCT_DATA_ERROR_CODE){
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
           }
            else{
              this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
    
            }
        }
      else{
        this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
      }
      },
    });
  }


  get f() { return this.addQuotationForm.controls; }

  

  onMatOptionClicked(product: any) {
    this.allProducts = this.allProducts.filter(p => p !== product);
    this.templateProducts.push(product);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);

  }

  onClickDeleteProductList(product: any) {
    this.templateProducts.splice(product, 1)
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    this.allProducts.push(product)
  }

  
  // Code for upload documents
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const fileList: FileList = event.target.files;
      const thumbnailList = document.getElementById('selectFiles');
      const newFiles = Array.from(fileList);

      if (this.fileCount + newFiles.length > 10) {
        this.toaster.error('You can upload a maximum of 10 files');
        return;
      }

      for (const file of newFiles) {
        if (file.size / 1000000 >= 5) {
          this.toaster.error('Please upload files less than 5 MB.');
          continue;
        }

        if (file.type.startsWith('image/') || file.type === 'application/pdf' || file.type === 'application/msword') {
          this.files.push(file);
          this.fileCount += 1;

          const thumbnailContainer = document.createElement('div');
          thumbnailContainer.className = 'thumbnails';

          let fileName = file.name;
          let arr = file.name.split('.');
          if (arr[0].length > 10) fileName = arr[0].slice(0, 10) + '...' + arr[1];
          const spn = document.createElement('span');
          spn.innerText = fileName;
          thumbnailContainer.id = file.name;
          thumbnailContainer.appendChild(spn);

          if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.width = 200;
            img.height = 200;
            img.src = URL.createObjectURL(file);
            thumbnailContainer.appendChild(img);
          } else if (file.type === 'application/pdf') {
            thumbnailContainer.innerHTML = '<i class="fa fa-file-pdf-o" style="font-size:130px;color:red"></i>';
            thumbnailContainer.prepend(spn);
          } else {
            thumbnailContainer.innerHTML = '<i class="fa-solid fa-file" style="font-size:150px;color:red"></i>';
            thumbnailContainer.prepend(spn);
          }

          const removeBtn = document.createElement('button');
          removeBtn.className = 'btn btn-close remove-btn';
          removeBtn.addEventListener('click', () => this.removeThumbnail(thumbnailContainer));
          thumbnailContainer.appendChild(removeBtn);

          if (thumbnailList) thumbnailList.appendChild(thumbnailContainer);
        } else {
          this.toaster.error('Unsupported file type: Only .doc, .jpeg, .png, and .pdf are allowed.');
        }
      }
    }
  }
  

  removeThumbnail(thumbnailContainer: any) {

    const thumbnailList = document.getElementById('selectFiles');
    if (thumbnailList)
      thumbnailList.removeChild(thumbnailContainer);
      for (const file of this.files){
        if (file.name == thumbnailContainer.id){
         
          this.files.splice( this.files.indexOf(file),1)

        }
      }

    this.fileCount -= 1;
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.getElementById('selectFiles');
    if (dropZone) {
      dropZone.classList.add('dragover');
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.getElementById('selectFiles');
    if (dropZone) {
      dropZone.classList.remove('dragover');
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = document.getElementById('selectFiles');
    if (dropZone) {
      dropZone.classList.remove('dragover');
    }
    const files = event.dataTransfer?.files;
    if (files) {
      this.onFileSelected({ target: { files } });
    }
  }
  
  // showSummaryPopup() {
  //   this.showPopup = true;
  // }

  // hideSummaryPopup() {
  //   this.showPopup = false;
  // }
 

  actualFileUploadCalls:any =0;

  addQuotation() {
    const productList = this.templateProducts.map(product => {
      const productId = product.productId;

      return {
        productId,
      };
    })
    const productListIsNull = !productList || productList.length === 0;
    if (productListIsNull) {
      this.toastr.error("Please Add Atleast One Product.");
      return;
  }
   
    
    const formSubmit = {
      customerId: this.addQuotationForm.get('customerId')?.value,
      quotationDate: this.addQuotationForm.get('quotationDate')?.value,
      newField1: this.addQuotationForm.get('newField1')?.value,
      newField2: this.addQuotationForm.get('newField2')?.value,
      newField3: this.addQuotationForm.get('newField3')?.value,
      newField4: this.addQuotationForm.get('newField4')?.value,
      newField5: this.addQuotationForm.get('newField5')?.value,
      newField6: this.addQuotationForm.get('newField6')?.value,
      newField7: this.addQuotationForm.get('newField7')?.value,
      newField8: this.addQuotationForm.get('newField8')?.value,
      saleNote1: this.addQuotationForm.get('saleNote1')?.value,
      saleNote2: this.addQuotationForm.get('saleNote2')?.value,
      saleNote3: this.addQuotationForm.get('saleNote3')?.value,
      saleNote4: this.addQuotationForm.get('saleNote4')?.value,
      products: productList,
     
    
    }
   
  
    this.submitted = true;
    
    if (this.addQuotationForm.valid) {
     
      let quotationId = 0;
      this.api.addQuotation(formSubmit).subscribe({
        next: (res) => {
          if (this.files && this.files.length > 0) {
            for (const file of Array.from(this.files)) { 
              quotationId = res.data.id;
              let doctype =0;
              if(file.type.includes("image"))
              doctype=1;
              if(file.type.includes("pdf"))
              doctype=2
              const fileData: fileUploadData = {
                file: file,
                documentTypes: doctype,
                quotationId: quotationId,
              };
               
              this.api.uploadQuotationDocuments(fileData).subscribe({
                next: (res) => {
          
                  this.actualFileUploadCalls++;
                  if(this.files.length==this.actualFileUploadCalls){
                    this.actualFileUploadCalls =0;
        
                  }
                   
                },
                error: (error) =>{
                }
                
              })
            }
            this.toaster.success(this.constants.SuccessMessages.QUOTATION_SAVED_MESSAGE)
          
            
            this.router.navigate(['/sales'])
          }
         
             
        },

        error:(error) => {
            if(error.error.error){
              if(error.error.error.code == this.constants.ErrorCodes.CUSTOMER_ID_CAN_NOT_BE_BLANK_ERROR_CODE){
                this.toaster.error(this.constants.Messages.CUSTOMER_ID_CAN_NOT_BE_BLANK)
              }
              else if(error.error.error.code == this.constants.ErrorCodes.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE){
                this.toaster.error(this.constants.Messages.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE)
              }
              else if(error.error.error.code == this.constants.ErrorCodes.FAILED_TO_SAVE_QUOTATION_DATA_ERROR_CODE){
                this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_QUOTATION_MESSAGE)
              }
              else {
                this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_QUOTATION_MESSAGE)
              }
            }
            else{
              this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_QUOTATION_MESSAGE)
            }
        }
      })

    }
}

}