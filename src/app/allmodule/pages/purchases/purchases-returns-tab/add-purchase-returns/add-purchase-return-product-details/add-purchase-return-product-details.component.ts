import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from '../../../purchases.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PurchaseReturnService } from 'src/app/allmodule/services/api_services/purchase-return.service';
import { ToastrService } from 'ngx-toastr';
import { PurchaseReturnDataService } from 'src/app/allmodule/services/data_services/purchase-return-data.service';
import { Constants } from 'src/app/app.constants';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';

@Component({
  selector: 'app-add-purchase-return-product-details',
  templateUrl: './add-purchase-return-product-details.component.html',
  styleUrls: ['./add-purchase-return-product-details.component.css']
})
export class AddPurchaseReturnProductDetailsComponent implements OnInit {
  addPurchasesReturnForm!: FormGroup;
  createdDivs: any[] = [];
  allsupplier: any[] = [];
  customerByProducts: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  submitted = false;
  totalReturnAmount = 0;
  productDetailsObject: any;
  returnSubTotal = 0;
  totalReturnSubtotal: number = 0;
  addSalesReturnProductForm!: FormGroup;
  displayedColumns: string[] = ['productName', 'Batch', 'Return_Quantity', 'Return_Subtotal', 'action',];
  dataSource = new MatTableDataSource<PeriodicElement>();
  paymentDetails: any;

  constructor(private router: Router, private api: PurchaseReturnService, private supplierApi: SupplierService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder, private dataService: PurchaseReturnDataService) {

    this.loadSupplier()
  }

  ngOnInit(): void {
    this.addPurchasesReturnForm = this.formBuilder.group({
      supplierId: ['', Validators.required],
      returnDate: ['', Validators.required],

    });
    this.paymentDetails = this.dataService.getReturnPaymentDetails();
    
    this.productDetailsObject = this.dataService.getReturnProductDetails();
  
    
    if(this.productDetailsObject){
    this.addPurchasesReturnForm.patchValue({
    supplierId: this.productDetailsObject.supplierId,
    returnDate: this.productDetailsObject.returnDate, 
     
    });

   
      this.templateProducts=this.productDetailsObject.productDetails;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
     this.totalReturnAmount=this.productDetailsObject.totalReturnAmount;
    
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

  getProductBySupplierId(supplierId: number) {
    this.api.getProductBySupplierId(supplierId).subscribe({
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

    })
  }
  get f() { return this.addPurchasesReturnForm.controls; }

  onMatOptionClicked(product: any) {
    
    let supplierId = Number(this.addPurchasesReturnForm.controls['supplierId'].value);
    this.allProducts = this.allProducts.filter(p => p !== product);
    this.templateProducts.push(product);
    this.api.getPurchaseByProductIdAndSupplierId(product.productId, supplierId).subscribe({
      next: (res) => {
        
        this.templateProducts.forEach(function(product){   
          if(product.productId == res.data.productId){
            product.batches = res.data.batches;
            return;
          } 
          });  
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
      },
      error: (error) => {
        if (error.error.error) {
          if (this.constants.ErrorCodes.PURCHASE_ID_DOES_NOT_EXISTS_ERROR_CODE) {
            this.toaster.error(this.constants.Messages.PURCHASE_ID_DOES_NOT_EXISTS_MESSAGE)
          }
          this.toaster.error(this.constants.Messages.PURCHASE_ID_DOES_NOT_EXISTS_MESSAGE)
        }
        this.toaster.error(this.constants.Messages.PURCHASE_ID_DOES_NOT_EXISTS_MESSAGE)
      }
    })
  }
  calculateReturnSubTotalFromQuantityEditBox(value: any, product: any) {
    if (product.selectedBatchId <= 0) {
      return;
    }
    if (value == '' || value == null) {
      value = 0;
      return;
    }
    product.returnQuantity = value;
    for (const batch of product.batches) {

      if (product.selectedBatchId == batch.batchId) {
        product.batchId = batch.batchId;
        product.amount = product.returnQuantity * batch.mrpPerPack;
        return;
      }

    }
  }

  calculateReturnSubTotalFromBatchDropdown(batchId: any, product: any) {

    if (!product.returnQuantity) {
      return;
    }
    //Get selected batch object.  
    if (batchId == '' || batchId == null) {
      batchId = 0;
      return;
    }

    for (const batch of product.batches) {

      if (batchId == batch.batchId) {
        product.amount = product.returnQuantity * batch.mrpPerPack;
        return;
      }

    }
  }
  onClickDeleteProductList(product: any) {
    const index = this.templateProducts.indexOf(product);
    if (index !== -1) {
      this.templateProducts.splice(index, 1);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    }
    this.allProducts.push(product)

  }
  calculateTotalReturnAmount() {

    let total = 0;
    for (const product of this.templateProducts) {
      if (!isNaN(product.amount)) {
        total += product.amount;
      }
    }
    return total;
  }
  continueToPaymentDetails(){
    
    const hasBlankReturnQuantity = this.templateProducts.some(product => !product.returnQuantity );
  
    if (hasBlankReturnQuantity) {
      this.toaster.error('Return Quantity cannot be blank. Please enter a value for all products.');
      return;
    }
  
    
  
    if (this.templateProducts.length === 0) {
      this.toaster.error('Please add products before saving.');
      return; 
    }
   
  this.submitted = true
    if(this.addPurchasesReturnForm.valid){
      
      this.productDetailsObject = {
        supplierId: this.addPurchasesReturnForm.value.supplierId,
      totalReturnAmount: this. calculateTotalReturnAmount(),
       returnDate: this.addPurchasesReturnForm.value.returnDate,
       productDetails: this.templateProducts,
     };
   
  }
  this.dataService.setReturnProductDetails(this.productDetailsObject);
  this.dataService.setReurnPaymentDetails(this.paymentDetails);
  this.router.navigate(['/add-purchase-return-payment-details']);
  }
  
}
