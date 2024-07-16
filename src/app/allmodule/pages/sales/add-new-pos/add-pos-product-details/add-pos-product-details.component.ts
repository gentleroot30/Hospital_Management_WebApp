import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Constants } from 'src/app/app.constants';
import { NumberToWordsService } from '../../number-to-words.service';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';

// interface Batch {
//   batchNo: string;
//   batchId: number;
//   productId: number;
//   mrpPerPack: number;

// }

// Define the structure of the product object
// interface Product {
//   productName: string;
//   batch: Batch[];
// }

export interface PeriodicElement {
  productName: string;
  quantity: string;
  amount: number;

}

export interface PaymentDetails {
  paymentMethod: number,
  amount: number,
  paymentDate: Date
}


const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-add-pos-product-details',
  templateUrl: './add-pos-product-details.component.html',
  styleUrls: ['./add-pos-product-details.component.css']
})
export class AddPosProductDetailsComponent implements OnInit {




  displayedColumns: string[] = ['productName', 'Batch', 'quantity', 'amount', 'action'];
  allCustomer: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  batchData: any[] = [];
  totalBill: number = 0;
  productDetailsObject: any;
  productId: number = 0;

  paymentDetails: any[] = [];



  submitted = false;
  formData = {
    searchByType: 1,
    searchByValue: '',
  }
  addPosProductDetailsForm!: FormGroup;
  minDate: string='';

  constructor(private router: Router, private api: PosService, private customerApi: CustomersService, private productApi: ProductService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder, private dataService: PosDataService) {  
    this.loadCustomers();
    this.getProductList();
    this.setMinDate();


  }
  dataSource = new MatTableDataSource<PeriodicElement>();


  ngOnInit(): void {


    this.addPosProductDetailsForm = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      posDate: ['', Validators.required],
      batchDropDown: [''],
      productId: [''],
      amount: [''],
      quantity: ['']
    });

    
    this.paymentDetails = this.dataService.getPaymentDetails();
    this.productDetailsObject = this.dataService.getProductDetails();

    if (this.productDetailsObject) {
    this.addPosProductDetailsForm.patchValue({
      customerId: this.productDetailsObject.customerId,
      posDate: this.productDetailsObject.posDate,

    });
     
      this.templateProducts = this.productDetailsObject.productDetails;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
      this.totalBill = this.productDetailsObject.totalBill;

    }


  }
  private setMinDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
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

  getBatchesForProduct(productId: any) {
    this.api.getBatchesByProductId(productId).subscribe({
      next: (res) => {
        
        this.templateProducts.forEach(function (product) {
          if (product.productId == res.data.productsbatches[0].productId) {
            product.batches = res.data.productsbatches;
            return;
          }

        });
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);

      },

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
        if (error.error.error) {
          if (error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_CUSTOMER_DATA_ERROR_CODE) {
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_DATA_MESSAGE)
          }
          else {
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_DATA_MESSAGE)
          }
        }
        else {
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_DATA_MESSAGE)
        }
      }
    })
  }

  

  onMatOptionClicked(product: any) {
    
    this.allProducts = this.allProducts.filter(p => p !== product);
     product.selectedBatchId = 0;
    this.templateProducts.push(product);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    this.api.getBatchesByProductId(product.productId).subscribe({
      next: (res) => {
  
        this.templateProducts.forEach(function(product){  
          
        if(product.productId == res.data.productsbatches[0].productId){
          product.batches = res.data.productsbatches;
          return 
        } 
        });  
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);

      },
      error: (error) => {
        this.toaster.error("error occured in getbatchesbyproductid")
      }
    });

  }

 

  calculateSubTotalFromQuantityEditBox(value: any, product: any) {
    if (product.selectedBatchId <= 0) {
      return; 
  }
    if (value == '' || value == null) {
      value = 0;
      return;
    }
     product.salesQuantity = value;
     for (const batch of product.batches) {
      if (product.selectedBatchId == batch.batchId) {
        product.batchId = batch.batchId;
        product.amount = product.salesQuantity * batch.mrpPerPack;
        return;
      }

    }

    
  }   
    calculateSubTotalFromBatchDropdown(batchId: any, product:any) {      
      //Get selected batch object.  
      if (batchId == '' || batchId == null) {
        batchId = 0;
        return;
      }
      // product.selectedBatchId = batchId
      if (!product.salesQuantity) {
        return; 
    }
    for (const batch of product.batches) {
      if (product.selectedBatchId == batch.batchId) {
        product.batchId = batch.batchId;
        product.amount = product.salesQuantity * batch.mrpPerPack;
        return;
      }

    }
     
    }

    calculateTotalAmount() {
      
      let total = 0;
      for (const product of this.templateProducts) {
        if(!isNaN(product.amount)){
          total += product.amount;
        }
        
      }
      return total;
    }

    calculateTotalDiscount(): number {
      let totalDiscount = 0;
      for (const product of this.templateProducts) {
          let discount = product.amount * product.discountPercent / 100;
          totalDiscount += discount;
      }
      return  parseFloat(totalDiscount.toFixed(2));
  }

calculatePayableAmount(): number {
  let totalAmount = this.calculateTotalAmount();
  let totalDiscount = this.calculateTotalDiscount();
  let payableAmount = totalAmount - totalDiscount;
  return parseFloat(payableAmount.toFixed(2));
}


  onClickDeleteProductList(product: any) {
    const index = this.templateProducts.indexOf(product);
    if (index !== -1) {
      this.templateProducts.splice(index, 1);
      this.totalBill -= Number(product.amount);
      // Update the MatTableDataSource
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    }
   this.allProducts.push(product)
    
  }

  get f() { return this.addPosProductDetailsForm.controls; }

  addPosProductDetails() {
    
    if (this.templateProducts.length === 0) {
      this.toaster.error('Please add products before saving.');
      return;
    }
    
    this.submitted = true;
    if (this.addPosProductDetailsForm.valid) {
    
      this.productDetailsObject = {
        customerId: this.addPosProductDetailsForm.value.customerId,
        totalBill: this.calculateTotalAmount(),
        posDate: this.addPosProductDetailsForm.value.posDate,
        totalDiscount:this.calculateTotalDiscount(),
        payable:this.calculatePayableAmount(),
        productDetails: this.templateProducts,
      };

      this.dataService.setProductDetails(this.productDetailsObject);
      this.router.navigate(['/add-pos-payment-details']);

    }

  }

}
