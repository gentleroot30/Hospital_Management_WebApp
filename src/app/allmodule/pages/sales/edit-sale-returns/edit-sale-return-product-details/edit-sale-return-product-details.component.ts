import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { SalesReturnService } from 'src/app/allmodule/services/api_services/sales-return.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { Constants } from 'src/app/app.constants';
import { PeriodicElement } from '../../sales.component';
import { SaleReturnDataService } from 'src/app/allmodule/services/data_services/sale-return-data.service';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';

@Component({
  selector: 'app-edit-sale-return-product-details',
  templateUrl: './edit-sale-return-product-details.component.html',
  styleUrls: ['./edit-sale-return-product-details.component.css']
})
export class EditSaleReturnProductDetailsComponent implements OnInit {

  allCustomer: any[] = [];
  customerByProducts: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  templatePayments: any[] = [];
  deletedProducts: any[] = [];
  submitted = false;
  totalReturnAmount =0;
  totalReturnAmountPaid =0;
  productDetails :any;
  returnSubTotal = 0;
  totalReturnSubtotal: number = 0;
  returnId = 0;
  editSaleReturnsProductDetailsForm!: FormGroup;
  displayedColumns: string[] = ['productName', 'Batch', 'Return_Quantity', 'Return_Subtotal','action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  paymentDetails: any;
  constructor(private router: Router,private activateRouter:ActivatedRoute, private api: SalesReturnService, private customerApi: CustomersService, public dialog: MatDialog,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,private dataService:SaleReturnDataService, private batchApi:PosService)
     { 
      this.loadCustomers()
      
     }

  ngOnInit(): void {

    this.editSaleReturnsProductDetailsForm = this.formBuilder.group({
      customerId: ['',],
      returnDate: ['',],
    });
    
    this.paymentDetails = this.dataService.getReturnPaymentDetails();
    this.productDetails = this.dataService.getReturnProductDetails();
    if (this.productDetails) {
      this.editSaleReturnsProductDetailsForm.patchValue({
        customerId: this.productDetails.customerId,
        returnDate: this.productDetails.returnDate, 
      });
      this.templateProducts=this.productDetails.productDetails;
      this.deletedProducts = this.productDetails.deletedProducts;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
       this.totalReturnAmount=this.productDetails.totalReturnAmount;
       this.returnId = this.productDetails.returnId;
    }
    else{
      this.returnId = this.activateRouter.snapshot.queryParams['salesId']
      this.getReturnById()
    }

  
     

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
  getReturnById(){
    
    this.returnId = this.activateRouter.snapshot.queryParams['returnId']
    this.api.getSalesReturnById(this.returnId).subscribe({
      next:(res)=> {  
        
        this.editSaleReturnsProductDetailsForm.controls['customerId'].setValue(res.data.customerId);
        const formattedDate = this.formatDate(res.data.returnDate);
        this.paymentDetails = res.data.paymentDetails;
        this.editSaleReturnsProductDetailsForm.controls['returnDate'].setValue(formattedDate);
        this.templatePayments = res.data.payementDetails;
           if (res.data.productDetails) {
            this.templateProducts = res.data.productDetails;
            for (var templateProduct of this.templateProducts) {
              templateProduct.returnQuantity = templateProduct.returnQuantity;
            templateProduct.selectedBatchId = templateProduct.batchId;
              templateProduct.amount = templateProduct.mrpPerPack*templateProduct.returnQuantity
              this.getBatchesForProduct(templateProduct.productId)
              for (var product of this.allProducts) {
                if (templateProduct.productId == product.productId) {
                  this.allProducts = this.allProducts.filter(p => p !== product);
                }
              }
            }
           
          }

          this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
        
          this.totalReturnAmount=res.data.totalReturnAmount
        
      },
    })
  }

  getBatchesForProduct(productId: any) {
    
    this.batchApi.getBatchesByProductId(productId).subscribe({
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





  formatDate(dateString: string): string {
    let newDate = new Date(dateString);
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
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
  
  let customerId= Number(this.editSaleReturnsProductDetailsForm.controls['customerId'].value);
  this.allProducts = this.allProducts.filter(p => p !== product);
  let tempProduct = {
    "productId": product.productId,
    "batchId": 0,
    "productName": product.productName,
    "returnQuantity": 0,
    "amount": 0,
    "selectedBatchId": 0,
    "opType": 1,
  }
  this.templateProducts.push(tempProduct);
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

  if (product.opType !== 1) {
    product.opType = 2;
  }
 
  for (const batch of product.batches) {
    
    if (product.selectedBatchId == batch.batchId) {
      product.batchId = batch.batchId;
      product.amount = product.returnQuantity * batch.mrpPerPack;
      return;
    }

  }
  
}   
 calculateReturnSubTotalFromBatchDropdown(batchId: any, product:any) {
  
  if (product.returnQuantity <= 0) {
    return;
  }
  //Get selected batch object.  
  if (batchId == '' || batchId == null) {
    batchId = 0;
    return;
  }
  
  for (const batch of product.batches) {
    if (batchId == batch.batchId) {
      if (product.opType !== 1) {
        product.opType = 2;
      }
      product.amount =product.returnQuantity * batch.mrpPerPack;
      return;
    }

  }

}

calculateTotalReturnAmount() {

  let total = 0;
  for (const product of this.templateProducts) {
    total += product.amount;
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
    this.templateProducts.splice(index, 1);
    this.totalReturnAmount -= Number(product.amount);
    // Update the MatTableDataSource
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
  }
  this.allProducts.push(product)
  this.deletedProducts.push(deletedProduct);

}





 
 
 
  editSaleReturnsProductDetails(){
  
    if(this.editSaleReturnsProductDetailsForm.valid){
      
      this.productDetails = {
       customerId: this.editSaleReturnsProductDetailsForm.value.customerId,
       totalReturnAmount: this.calculateTotalReturnAmount(),
       returnDate: this.editSaleReturnsProductDetailsForm.value.returnDate,
       productDetails: this.templateProducts,
       paymentDetails:this.paymentDetails,
       returnId:this.returnId,
       deletedProducts:this.deletedProducts,
       totalReturnAmountPaid:this.totalReturnAmountPaid,
     };
   
  }
  if(!this.paymentDetails){
    this.paymentDetails = {
      templatePayments: this.templatePayments,
    };
  }
  this.dataService.setReturnProductDetails(this.productDetails);
  this.dataService.setReurnPaymentDetails(this.paymentDetails);
  this.router.navigate(['/edit-sale-return-payment-details']);
  }
  


  
}
