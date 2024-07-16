import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';
import { PurchaseDataService } from 'src/app/allmodule/services/data_services/purchase-data.service';
import { Constants } from 'src/app/app.constants';
import { PeriodicElement, PurchasesComponent } from '../../../purchases.component';

import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';


@Component({
  selector: 'app-edit-purchase-product-details',
  templateUrl: './edit-purchase-product-details.component.html',
  styleUrls: ['./edit-purchase-product-details.component.css']
})
export class EditPurchaseProductDetailsComponent implements OnInit {

  allsupplier: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  deletedProducts: any[] = [];
  submitted = false;
  productDetails:any;
  paymentDetails: any;
  templatePayments: any[] = [];
  purchaseId =0;
  totalBill: number = 0;
  files:  any[]=[];
  fileCount: number = 0;
  filesToBeDeleted:any[]=[];
  uploadStatus: string = '';
  upload: string = '';
  file: File | null = null;
  formData = {
    searchByType: 1,
    searchByValue: '',
  }
  displayedColumns: string[] = ['productName', 'batchNo', 'expiryDate','packOf','mrpPerPack','unitPrice', 'quantity', 'totalMrp','totalBill', 'action'];
 
  constructor(private router:Router, private api:PurchasesService, private activateRouter:ActivatedRoute, private supplierApi:SupplierService, private productApi:ProductService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder, private dataService: PurchaseDataService) {
      this.loadSupplier();
      this.getProductList();
    
     }
     editPurchaseProductDetailsForm!: FormGroup;
     dataSource = new MatTableDataSource<PeriodicElement>();
     
  ngOnInit(): void {
    this.editPurchaseProductDetailsForm = this.formBuilder.group({
      supplierId: ['', [Validators.required]],
      invoiceNumber:[''],
      purchaseDate: ['', Validators.required],
      file: [''],
    });
   
    
    this.paymentDetails = this.dataService.getPurchasePaymentDetails();
    this.productDetails = this.dataService.getPurchaseProductDetails();
  
    if (this.productDetails) {
    this.editPurchaseProductDetailsForm.patchValue({
      supplierId: this.productDetails.supplierId,
      invoiceNumber:this.productDetails.invoiceNumber,
      purchaseDate: this.productDetails.purchaseDate,
    });
    this.templateProducts=this.productDetails.templateProducts;
    this.deletedProducts = this.productDetails.deletedProducts; 
    this.files = this.productDetails.files;
    this.purchaseId = this.productDetails.purchaseId;
    this.setFilesToUI(this.files)
    
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
      this.totalBill = this.productDetails.totalBill;

    }

    else{
      
      this.purchaseId = this.activateRouter.snapshot.queryParams['purchaseId']
      this.getPurchaseById();
    }


  }

  getPurchaseById(){  
    this.api.getPurchaseById(this.purchaseId).subscribe({
      next:(res)=> {
        this.editPurchaseProductDetailsForm.controls['supplierId'].setValue(res.data.supplierId);
        this.editPurchaseProductDetailsForm.controls['invoiceNumber'].setValue(res.data.invoiceNumber);
        const formattedDate = this.formatDate(res.data.purchaseDate);
        this.editPurchaseProductDetailsForm.controls['purchaseDate'].setValue(formattedDate);
        this.paymentDetails = res.data.paymentDetails;
        if (res.data.productDetails) {
          this.templateProducts = res.data.productDetails;
          for (var templateProduct of this.templateProducts) {
            
            templateProduct.unitPrice = templateProduct.mrpPerPack && templateProduct.packOf ? templateProduct.mrpPerPack / templateProduct.packOf : 0;
          templateProduct.totalMrp = templateProduct.quantity && templateProduct.mrpPerPack ? templateProduct.quantity * templateProduct.mrpPerPack : 0;
             templateProduct.totalBill = templateProduct.totalMrp ? templateProduct.totalMrp * (1 - templateProduct.discountPercent / 100) : 0;
             for (var product of this.allProducts) {
              if (templateProduct.productId == product.productId) {
                this.allProducts = this.allProducts.filter(p => p !== product);
              }
            }
          }
          this.templateProducts.forEach((product: any)=>{
            product.expiryDate = this.formatDate(product.expiryDate); 
          });
         
        }
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
        this.files = res.data.documents;
        this.setFilesToUI(this.files);
      },
    })
  }



  formatDate(dateString: string): string {
    let newDate = new Date(dateString);
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
  
    return formattedDate;
}

  

  loadSupplier() {

    this.supplierApi.searchSupplier(1, '').subscribe({
      next: (res) => {

        if (res.data.length > 0) {
          this.allsupplier = res.data;
        }

      },
      error: (error) => {
        if (error.error.error) {
          if (error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_SUPPLIER_DATA_ERROR_CODE) {
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_SUPPLIER_DATA_MESSAGE)
          }
          else {
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_SUPPLIER_DATA_MESSAGE)
          }
        }
        else {
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_SUPPLIER_DATA_MESSAGE)
        }
      }
    })
  }

  getProductList() {
    this.productApi.getAllProducts(this.formData.searchByType, this.formData.searchByValue).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        for (var templateProduct of this.templateProducts) {
          for (var product of this.allProducts) {
            if (templateProduct.productId == product.productId) {
              this.allProducts = this.allProducts.filter(p => p !== product);
            }
          }
      }

      },
      error: (error) => {

        if (error.error.error) {
          if (error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_PRODUCT_DATA_ERROR_CODE) {
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
          }
          else {
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)

          }
        }
        else {
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
        }
      },
    });
  }
  get f() { return this.editPurchaseProductDetailsForm.controls; }


  onMatOptionClicked(product: any) {
    
    this.allProducts = this.allProducts.filter(p => p !== product);
    let tempProduct = {
      "productId": product.productId,
      "batchNo": '',
      "productName": product.productName,
      "expiryDate":'',
      "packOf":'0',
      "mrpPerPack":'0',
      "unitPrice":'',
      "quantity": 0,
      "totalMrp":'',
      "totalBill":'',
      "discountPercent":product.discountPercent,
      "opType": 1,
    }
    this.templateProducts.push(tempProduct);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);

  }


  calculateValues(product: any): void {
    
  if (product.opType !== 1) {
    product.opType = 2;
  }
    
    product.unitPrice = product.mrpPerPack && product.packOf ? product.mrpPerPack / product.packOf : 0;
    product.totalMrp = product.quantity && product.mrpPerPack ? product.quantity * product.mrpPerPack : 0;
    product.totalBill = product.totalMrp ? product.totalMrp * (1 - product.discountPercent / 100) : 0;
   
    
  }

  calculateTotalDiscount(): number {
    
    let totalDiscount = 0;
    
    for (const product of this.templateProducts) {
      if (product.opType !== 1) {
        product.opType = 2;
      }
        let discount = product.totalMrp * product.discountPercent / 100;
        totalDiscount += discount;
    }
  
    return  parseFloat(totalDiscount.toFixed(2));
}

  calculateTotalMrp(){
    let total = 0;
      for (const product of this.templateProducts) {
        if (product.opType !== 1) {
          product.opType = 2;
        }
        if(!isNaN(product.totalMrp)){
          total += product.totalMrp;
        }
        
      }
      return total;
  }

  calculateTotalAmount(){
    
    let total = 0;
      for (const product of this.templateProducts) {
        if (product.opType !== 1) {
          product.opType = 2;
        }
        if(!isNaN(product.totalBill)){
          
          total += product.totalBill;
        }
        
      }
      return total;
  }

  onClickDeleteProductList(product: any) {
    let deletedProduct = {
      "productId": product.productId,
      "batchId": product.batchId,
      "opType": 3,
    }
    const index = this.templateProducts.indexOf(product);
    if (index !== -1) {
      product.opType = 3;
      this.templateProducts.splice(index, 1);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
      product.totalMrp = this.calculateTotalMrp();
      product.totalBill = this.calculateTotalAmount();
      
    }
   this.allProducts.push(product)
   this.deletedProducts.push(deletedProduct);
  }
 
  onFileSelected(event:any){
    
    if (event.target.files.length > 0) {
      
      for (let file of event.target.files){
        this.files.push(file);
      }

       this.setFilesToUI(event.target.files);
      

    }
   
    
  }

  
  setFilesToUI(files :any []){
    
    const thumbnailList = document.getElementById('selectFiles');
     
      if (files.length <= 10) {
        for (const file of Array.from(files)) {
          
          if(file.size){
            this.setNewFilesToUI(file);
          }else{

            this.setAlreadyUploadedFilesToUI(file);
          }
        }
      }
  }

  setNewFilesToUI(file: any){
    const thumbnailList = document.getElementById('selectFiles');
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
              removeBtn.addEventListener('click', () => this.removeThumbnail(thumbnailContainer));
              
              thumbnailContainer.appendChild(removeBtn);
              if (thumbnailList)
                thumbnailList.appendChild(thumbnailContainer);
            }
            else {
              this.toaster.error("please upload file less than 5 MB")
            }
        
  }
  
  setAlreadyUploadedFilesToUI(file: any){  
    
    const thumbnailList = document.getElementById('selectFiles');
  
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
  removeThumbnailForServerFile(thumbnailContainer: any) {
    
    const thumbnailList = document.getElementById('selectFiles');
    if (thumbnailList)
      thumbnailList.removeChild(thumbnailContainer);
   
   // this.files.push(thumbnailContainer.id)
   
    this.files.splice(this.files.indexOf(thumbnailContainer),1)
    this.filesToBeDeleted.push(thumbnailContainer.id)
  }




  downloadDocument(event: Event) {
    let clickedElementId = (event.currentTarget as HTMLElement).id;
    
    
      // call document download api 
      
     
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


  continueToPaymentDetails(){
    if (this.templateProducts.length === 0) {
      this.toaster.error('Please add products before saving.');
      return;
    }
    
    this.submitted = true;
    
    if (this.editPurchaseProductDetailsForm.valid) {
      this.productDetails = {
        
        purchaseId:this.purchaseId,
        supplierId: this.editPurchaseProductDetailsForm.value.supplierId,
        purchaseDate: this.editPurchaseProductDetailsForm.value.purchaseDate,
        invoiceNumber:this.editPurchaseProductDetailsForm.value.invoiceNumber,
        totalBill: this.calculateTotalAmount(),
        totalMrp:this.calculateTotalMrp(),
        totalDiscount:this.calculateTotalDiscount(),
        paymentDetails:this.paymentDetails,
        deletedProducts:this.deletedProducts,
        templateProducts: this.templateProducts,
        files:this.files,
        filesToBeDeleted: this.filesToBeDeleted
      }
  
    

    }
    if(!this.paymentDetails){
      this.paymentDetails = {
        templatePayments: this.templatePayments,
      };
    }

    this.dataService.setPurchaseProductDetails(this.productDetails);
    this.dataService.setPurchasePaymentDetails(this.paymentDetails);
    this.router.navigate(['/edit-purchases-payment-details']);
  }

}
