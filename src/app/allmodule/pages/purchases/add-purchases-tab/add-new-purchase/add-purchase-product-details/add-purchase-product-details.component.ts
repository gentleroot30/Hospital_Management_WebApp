import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { PurchasesService } from 'src/app/allmodule/purchases.service';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';
import { Constants } from 'src/app/app.constants';
import { PeriodicElement } from '../../../purchases.component';
import { PurchaseDataService } from 'src/app/allmodule/services/data_services/purchase-data.service';
export interface fileUploadData {
  file: File | null;
  documentTypes: number;
  purchaseId: number;
}
@Component({
  selector: 'app-add-purchase-product-details',
  templateUrl: './add-purchase-product-details.component.html',
  styleUrls: ['./add-purchase-product-details.component.css']
})
export class AddPurchaseProductDetailsComponent implements OnInit {
  allsupplier: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  submitted = false;
  productDetailsObject:any;
  paymentDetails: any[] = [];
  totalBill: number = 0;
  files:  any[]=[];
  fileCount: number = 0;
  uploadStatus: string = '';
  upload: string = '';
  file: File | null = null;
  formData = {
    searchByType: 1,
    searchByValue: '',
  }
  displayedColumns: string[] = ['productName', 'batchNo', 'expiryDate','packOf','mrpPerPack','unitPrice', 'quantity', 'totalMrp','billTotal', 'action'];
 
  constructor(private router:Router, private supplierApi:SupplierService, private productApi:ProductService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder, private dataService: PurchaseDataService) {
      this.loadSupplier();
      this.getProductList();
    
     }
     addPurchaseProductDetailsForm!: FormGroup;
     dataSource = new MatTableDataSource<PeriodicElement>();
     
  ngOnInit(): void {
    this.addPurchaseProductDetailsForm = this.formBuilder.group({
      supplierId: ['', [Validators.required]],
      purchaseDate: ['', Validators.required],
      file: [''],
    });
   
    
    this.paymentDetails = this.dataService.getPurchasePaymentDetails();
    this.productDetailsObject = this.dataService.getPurchaseProductDetails();

    if (this.productDetailsObject) {
    this.addPurchaseProductDetailsForm.patchValue({
      supplierId: this.productDetailsObject.supplierId,
      invoiceNumber:this.productDetailsObject.invoiceNumber,
      purchaseDate: this.productDetailsObject.purchaseDate,
      

    });
     
    this.files = this.productDetailsObject.files;
    this.filesToDisplay();

      this.templateProducts = this.productDetailsObject.productDetails;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
      this.totalBill = this.productDetailsObject.totalBill;

    }


  }

  filesToDisplay(){
    
    let fileList : FileList = this.productDetailsObject.files;
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
            removeBtn.addEventListener('click', () => this.removeThumbnail(thumbnailContainer));

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
  get f() { return this.addPurchaseProductDetailsForm.controls; }


  onMatOptionClicked(product: any) {
    
    this.allProducts = this.allProducts.filter(p => p !== product);
    this.templateProducts.push(product);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);

  }


  calculateValues(product: any): void {
    product.unitPrice = product.mrpPerPack && product.packOf ? product.mrpPerPack / product.packOf : 0;
    product.totalMrp = product.purchaseQuantity && product.mrpPerPack ? product.purchaseQuantity * product.mrpPerPack : 0;
    product.billTotal = product.totalMrp ? product.totalMrp * (1 - product.discountPercent / 100) : 0;
  }

  calculateTotalDiscount(): number {
    let totalDiscount = 0;
    for (const product of this.templateProducts) {
        let discount = product.totalMrp * product.discountPercent / 100;
        totalDiscount += discount;
    }
    return  parseFloat(totalDiscount.toFixed(2));
}

  calculateTotalMrp(){
    let total = 0;
      for (const product of this.templateProducts) {
        if(!isNaN(product.totalMrp)){
          total += product.totalMrp;
        }
        
      }
      return total;
  }

  calculateTotalAmount(){
    let total = 0;
      for (const product of this.templateProducts) {
        if(!isNaN(product.billTotal)){
          total += product.billTotal;
        }
        
      }
      return total;
  }

  onClickDeleteProductList(product: any) {
    const index = this.templateProducts.indexOf(product);
    if (index !== -1) {
      this.templateProducts.splice(index, 1);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
      product.totalMrp = this.calculateTotalMrp();
      product.billTotal = this.calculateTotalAmount();
      
    }
   this.allProducts.push(product)
    
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
              removeBtn.addEventListener('click', () => this.removeThumbnail(thumbnailContainer));

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
    if (this.addPurchaseProductDetailsForm.valid) {
      
      this.productDetailsObject = {
        supplierId: this.addPurchaseProductDetailsForm.value.supplierId,
        totalBill: this.calculateTotalAmount(),
        totalMrp:this.calculateTotalMrp(),
        totalDiscount:this.calculateTotalDiscount(),
        purchaseDate: this.addPurchaseProductDetailsForm.value.purchaseDate,
        productDetails: this.templateProducts,
        files:this.files
      };

      this.dataService.setPurchaseProductDetails(this.productDetailsObject);
      this.dataService.setPurchasePaymentDetails(this.paymentDetails);
      this.router.navigate(['/add-purchases-payment-details']);

    }

  }
}
