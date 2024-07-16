import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../sales.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UseTemplateComponent } from '../use-template/use-template.component';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { SalesService } from 'src/app/allmodule/services/api_services/sales.service';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
export interface fileUploadData {
  file: File | null;
  documentTypes: number;
  quotationId: number;

}

@Component({
  selector: 'app-edit-quotation',
  templateUrl: './edit-quotation.component.html',
  styleUrls: ['./edit-quotation.component.css']
})

export class EditQuotationComponent implements OnInit {

  editQuotationForm!: FormGroup;
  quotationId:number = 0;
  products:any[]=[];
  allProducts:any[]=[];
  selectedFile: File | null = null;
  fileCount: number = 0;
  templateProducts:any[]=[];
  allCustomer:any[]=[];
  file: File | null = null;
  documents:any[]=[];
  files:  any[]=[];
  filesToBeDeleted:any[]=[];
  
  submitted = true
  displayedColumns: string[] = [ 'productName', 'customField1', 'customField2', 'customField3','action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
 
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,
    private api:SalesService, 
    private router:Router,private http:HttpClient,
    private productApi: QuotationService,
    private customerApi:CustomersService,
    private acivateRouter: ActivatedRoute,
    private toaster:ToastrService,
    private constants: Constants,) { 
      this.loadCustomers();
      this.getProductList();
  
    }
    formData = {
      searchByType: 1,
      searchByValue : '',
    }
   
    
  ngOnInit(): void {
   
    this.quotationId = this.acivateRouter.snapshot.queryParams['quotationId']
    this.editQuotationForm = this.formBuilder.group({
      quotationId:[''],
      customerId: (''),
      quotationDate:['',],
      newField1: ['', [ Validators.pattern(/^\d*\.?\d*$/)]],
      newField2:['', [ Validators.pattern(/^\d*\.?\d*$/)]],
      newField3:['', [ Validators.pattern(/^\d*\.?\d*$/)]],
      newField4:['', [ Validators.pattern(/^\d*\.?\d*$/)]],
      newField5:['', [ Validators.pattern(/^\d*\.?\d*$/)]],
      newField6:['',Validators.pattern(/^\d*\.?\d*$/)],
      newField7:['',Validators.pattern(/^\d*\.?\d*$/)],
      saleNote1:[''],
      saleNote2:[''],
      saleNote3:[''],
      saleNote4:[''],
      file: [''],
    })

   
   
    this.api.getQuotationById(this.quotationId).subscribe({
      
      next: (res)=>{
        this.editQuotationForm.controls['quotationId'].setValue(res.data.quotationId),
        this.editQuotationForm.controls['customerId'].setValue(res.data.customerId);
         const formattedDate = this.formatDate(res.data.quotationDate);
        this.editQuotationForm.controls['quotationDate'].setValue(formattedDate);
        this.editQuotationForm.controls['newField1'].setValue(res.data.newField1),
        this.editQuotationForm.controls['newField2'].setValue(res.data.newField2),
        this.editQuotationForm.controls['newField3'].setValue(res.data.newField3),
        this.editQuotationForm.controls['newField4'].setValue(res.data.newField4),
        this.editQuotationForm.controls['newField5'].setValue(res.data.newField5),
        this.editQuotationForm.controls['newField6'].setValue(res.data.newField6),
        this.editQuotationForm.controls['newField7'].setValue(res.data.newField7),
        this.editQuotationForm.controls['saleNote1'].setValue(res.data.saleNote1),
        this.editQuotationForm.controls['saleNote2'].setValue(res.data.saleNote2),
        this.editQuotationForm.controls['saleNote3'].setValue(res.data.saleNote3),
        this.editQuotationForm.controls['saleNote4'].setValue(res.data.saleNote4);
        this.templateProducts = res.data.products;
        if (res.data.products) {
          for (var templateProduct of this.templateProducts) {
            for (var product of this.allProducts) {
              if (templateProduct.productId == product.productId) {
                this.allProducts = this.allProducts.filter(p => p !== product);
                
              }
            }
          }
        }
        this.dataSource = new MatTableDataSource < PeriodicElement > (this.templateProducts);
        this.documents = res.data.documents;
         
      
        this.setFilesToDiv();
      },

      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.QUOTATION_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toaster.error(this.constants.Messages.QUOTATION_ID_DOES_NOT_EXISTS_ERROR_CODE)
          }
          this.toaster.error(this.constants.Messages.QUOTATION_ID_DOES_NOT_EXISTS_ERROR_CODE)
        }
      }
      

      })
     
  }
  formatDate(dateString: string): string {
    let newDate = new Date(dateString);
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
  
    return formattedDate;
}


  useTemplate(){
    this.dialog.open(UseTemplateComponent,{
      width:'1037px',height:'617px',
    }).afterClosed().subscribe((res)=>{
      
        this.templateProducts = res.data.quotationTempProducts;
        this.dataSource = new MatTableDataSource < PeriodicElement > (this.templateProducts); 
    })

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


  get f(){return this.editQuotationForm.controls;}


  onMatOptionClicked(product:any) {
    this.allProducts = this.allProducts.filter(p => p !== product);
    this.templateProducts.push(product);
     this.dataSource = new MatTableDataSource < PeriodicElement > (this.templateProducts); 
 
   }
 
   onClickDeleteProductList(product:any){
     this.templateProducts.splice(product,1)
     this.dataSource=new MatTableDataSource<PeriodicElement>(this.templateProducts);
     this.allProducts.push(product)
   }


   removeThumbnailForServerFile(thumbnailContainer: any) {
    
    const thumbnailList = document.getElementById('selectFiles');
    if (thumbnailList)
      thumbnailList.removeChild(thumbnailContainer);
   
    this.filesToBeDeleted.push(thumbnailContainer.id)
    this.fileCount -= 1;
  }
  
   

  removeThumbnailForFileSelect(thumbnailContainer: any) {
    
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
  
   onFileSelected(event:any){
    
    if (event.target.files.length > 0) {
      for (let file of event.target.files){
        this.files.push(file);
      }
       let fileList : FileList = event.target.files;
      const thumbnailList = document.getElementById('selectFiles');
        this.fileCount += Array.from(fileList).length;
      
        if (this.fileCount <= 10) {
          for (const file of Array.from(fileList)) {
            
            if (file.size / 1000000 < 5) {

              const thumbnailContainer = document.createElement('div');
              thumbnailContainer.className = 'thumbnails';
              
              let fileName = file.name;
              let arr = file.name.split('.');
              if (arr[0].length > 10)
                fileName = arr[0].slice(0, 10) + '...' + arr[1];
              let spn = document.createElement('span');
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
                // Display PDF symbol
                thumbnailContainer.innerHTML = '<i class="fa fa-file-pdf-o" style="font-size:130px;color:red"></i>';
                thumbnailContainer.prepend(spn);
              } else {
                thumbnailContainer.innerHTML = '<i class="fa-solid fa-file "style="font-size:150px;color:red"></i>'
                thumbnailContainer.prepend(spn);
              }



              const removeBtn = document.createElement('button');
              removeBtn.className = 'btn btn-close remove-btn';
              removeBtn.addEventListener('click', () => this.removeThumbnailForFileSelect(thumbnailContainer));

              thumbnailContainer.appendChild(removeBtn);
              if (thumbnailList)
                thumbnailList.appendChild(thumbnailContainer);
            }
            else {
              this.toaster.error("please upload file less than 5 MB")
            }
          }
        }
        else {
          this.toaster.error('please select max 10 files')
        }
      

    }
   
    
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
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-close remove-btn';
            removeBtn.addEventListener('click', () => this.removeThumbnailForServerFile(thumbnailContainer));

            thumbnailContainer.appendChild(removeBtn);
            if (thumbnailList)
              thumbnailList.appendChild(thumbnailContainer);
           
        }
       
    }

  }
   




actualDeleteCalls:any = 0;
actualFileUploadCalls:any =0;

updateQuotation(){
  const productList = this.templateProducts.map(product => {
    const productId = product.productId;

    return {
      productId,
    };
  })
  
 
  const formSubmit = {
    customerId : this.editQuotationForm.get('customerId')?.value,
    quotationNo : this.editQuotationForm.get('quotationNo')?.value,
    quotationDate: this.editQuotationForm.get('quotationDate')?.value,
    newField1 : this.editQuotationForm.get('newField1')?.value,
    newField2 : this.editQuotationForm.get('newField2')?.value,
    newField3 : this.editQuotationForm.get('newField3')?.value,
    newField4 : this.editQuotationForm.get('newField4')?.value,
    newField5 : this.editQuotationForm.get('newField5')?.value,
    newField6 : this.editQuotationForm.get('newField6')?.value,
    newField7 : this.editQuotationForm.get('newField7')?.value,
     saleNote1 : this.editQuotationForm.get('saleNote1')?.value,
     saleNote2 : this.editQuotationForm.get('saleNote2')?.value,
     saleNote3 : this.editQuotationForm.get('saleNote3')?.value,
     saleNote4 : this.editQuotationForm.get('saleNote4')?.value,
    products: productList,
    
  }

  
  this.submitted = true;
  if(this.editQuotationForm.valid){
    this.api.updateQuotation(this.quotationId,formSubmit).subscribe({
      next:(res)=>{
        
        this.deleteDocuments()
      },
      error:(error)=> {   
        
        if(error.error.error){
        if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_ID_CAN_NOT_BE_BlANK_ERROR_CODE){
           this.toaster.error(this.constants.Messages.CUSTOMER_ID_CAN_NOT_BE_BLANK)
        }
       else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_UPDATE_QUOTATION_DATA_ERROR_CODE){
        this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_QUOTATION_MESSAGE)
       }
       else if(error.error.error.code === this.constants.ErrorCodes.QUOTATION_NO_CAN_NOT_BE_BLANK_ERROR_CODE){
          this.toaster.error(this.constants.Messages.QUOTATION_NO_CAN_NOT_BE_BLANK)
        }
    
      else{
        this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_QUOTATION_MESSAGE)
      }
    }
    else{
      this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_QUOTATION_MESSAGE)
    }
    }
    
  })
  }
}

deleteDocuments(){
  if(this.filesToBeDeleted.length>0){
    for(let docId of this.filesToBeDeleted){
      
        this.api.deleteQutationDocuments(docId).subscribe({
           next:(res)=> {
            
            this.actualDeleteCalls++;
            if(this.filesToBeDeleted.length==this.actualDeleteCalls ){
              this.actualDeleteCalls = 0;
              this.uploadDocuments();
            
            }        
           },   
        })

    }
  }
  else{  
    this.uploadDocuments()
  }
}

uploadDocuments(){
  if (this.files && this.files.length > 0) {
    for (const file of Array.from(this.files)) {
     
      let doctype =0;
      if(file.type.includes("image"))
      doctype=1;
      if(file.type.includes("pdf"))
      doctype=2
      const fileData: fileUploadData = {
        file: file,
        documentTypes: doctype,
        quotationId: this.quotationId,
        
      };
       
      this.api.uploadQuotationDocuments(fileData).subscribe({
        
        next: (res) => {
          
          this.actualFileUploadCalls++;
          if(this.files.length==this.actualFileUploadCalls){
            this.actualFileUploadCalls =0;

            this.toaster.success(this.constants.SuccessMessages.QUOTATION_UPDATED_MESSAGE)
            this.router.navigate(['/sales'])
          }
           
        },
        error: (error) =>{
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.QUOTATION_DOCUMENT_PATH_DOES_NOT_EXISTS_ERROR_CODE){
          this.toaster.error(this.constants.Messages.QUOTATION_DOCUMENT_PATH_DOES_NOT_EXISTS_MESSAGE)
         }
          }
        }
        
      })

    }
  }
  else{
    this.toaster.success(this.constants.SuccessMessages.QUOTATION_UPDATED_MESSAGE)
    this.router.navigate(['/sales'])
  }

}






 downloadDocument(event: Event) {
  let clickedElementId = (event.currentTarget as HTMLElement).id;
  
  
    // call document download api 
    
   
}


}





