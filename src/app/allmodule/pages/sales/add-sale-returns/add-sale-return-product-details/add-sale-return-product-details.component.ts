import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/allmodule/services/api_services/api.service';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { SalesReturnService } from 'src/app/allmodule/services/api_services/sales-return.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { SaleReturnDataService } from 'src/app/allmodule/services/data_services/sale-return-data.service';
import { Constants } from 'src/app/app.constants';

export interface PeriodicElement {
  productName: string;
  Slno: number;
  Batch: number;
  Return_Quantity: number;
  Return_Subtotal: number;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-add-sale-return-product-details',
  templateUrl: './add-sale-return-product-details.component.html',
  styleUrls: ['./add-sale-return-product-details.component.css']
})
export class AddSaleReturnProductDetailsComponent implements OnInit {


  createdDivs: any[] = [];
  allCustomer: any[] = [];
  customerByProducts: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  submitted = false;
  totalReturnAmount =0;
  productDetailsObject :any;
  returnSubTotal = 0;
  totalReturnSubtotal: number = 0;
  addSalesReturnProductForm!: FormGroup;
  displayedColumns: string[] = ['productName', 'Batch', 'Return_Quantity', 'Return_Subtotal', 'action',];
  dataSource = new MatTableDataSource<PeriodicElement>();
  paymentDetails:any;

  constructor(private router: Router, private api: SalesReturnService, private customerApi: CustomersService, public dialog: MatDialog,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,private dataService:SaleReturnDataService) {
    this.loadCustomers();

  }

  ngOnInit(): void {
    this.addSalesReturnProductForm = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      returnDate: ['', Validators.required],
      batchDropDown: [''],
    });

    
    this.paymentDetails = this.dataService.getReturnPaymentDetails();

    this.productDetailsObject = this.dataService.getReturnProductDetails();
  
    
    if(this.productDetailsObject){
    this.addSalesReturnProductForm.patchValue({
    customerId: this.productDetailsObject.customerId,
    returnDate: this.productDetailsObject.returnDate, 
     
    });

   
      this.templateProducts=this.productDetailsObject.productDetails;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
     this.totalReturnAmount=this.productDetailsObject.totalReturnAmount;
    
 }

  }
  get f() { return this.addSalesReturnProductForm.controls; }


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


  getProductsByCustomerId(customerId: number) {
    this.api.getProductsByCustomerId(customerId).subscribe({
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
      error:(error)=>{
        if(error.error.error){
          if(this.constants.ErrorCodes.PRODUCT_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
          }
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
        }
       
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
        

      }
    
    })
  }



  onMatOptionClicked(product:any) {
    
   let customerId= Number(this.addSalesReturnProductForm.controls['customerId'].value);
   this.allProducts = this.allProducts.filter(p => p !== product);
   this.templateProducts.push(product);
   this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
   this.api.getSalesByProductIdAndCustomerId(product.productId,customerId).subscribe({
    next:(res)=>{
      this.templateProducts.forEach(function(product){   
      if(product.productId == res.data.productId){
        product.batches = res.data.batchData;
        return;
      } 
      });  
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    }, 
     error:(error)=>{
      if(error.error.error){
        if(this.constants.ErrorCodes.PURCHASE_ID_DOES_NOT_EXISTS_ERROR_CODE){
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
      
     if(product.selectedBatchId == batch.batchId){
      product.batchId = batch.batchId;
      product.amount = product.returnQuantity * batch.mrpPerPack;
      return;
     }
     
    }

    
  }   
    calculateReturnSubTotalFromBatchDropdown(batchId: any, product:any) {
      
      if (!product.returnQuantity) {
        return; 
    }
      //Get selected batch object.  
      if (batchId == '' || batchId == null) {
        batchId = 0;
        return;
      }
      
      for (const batch of product.batches) {
      
        if(batchId == batch.batchId){
         product.amount = product.returnQuantity * batch.mrpPerPack;
         return;
        }
        
       }
     
    }

    calculateTotalReturnAmount() {
      
      let total = 0;
      for (const product of this.templateProducts) {
        if(!isNaN(product.amount)){
          total += product.amount;
        }
      }
      return total;
    }

  onClickDeleteProductList(product: any) {
    const index = this.templateProducts.indexOf(product); 
    if (index !== -1) {   
      this.templateProducts.splice(index, 1); 
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    }
   this.allProducts.push(product)

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
 

  if(this.addSalesReturnProductForm.valid){
    
    this.productDetailsObject = {
     customerId: this.addSalesReturnProductForm.value.customerId,
    totalReturnAmount: this. calculateTotalReturnAmount(),
     returnDate: this.addSalesReturnProductForm.value.returnDate,
     productDetails: this.templateProducts,
   };
 
}
this.dataService.setReturnProductDetails(this.productDetailsObject);
this.dataService.setReurnPaymentDetails(this.paymentDetails);
this.router.navigate(['/add-sale-return-payment-details']);
}

}
