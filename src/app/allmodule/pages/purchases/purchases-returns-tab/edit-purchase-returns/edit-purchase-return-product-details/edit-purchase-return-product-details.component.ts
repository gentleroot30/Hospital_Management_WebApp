import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../../../purchases.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseReturnService } from 'src/app/allmodule/services/api_services/purchase-return.service';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';
import { Constants } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';
import { PurchaseReturnDataService } from 'src/app/allmodule/services/data_services/purchase-return-data.service';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';

@Component({
  selector: 'app-edit-purchase-return-product-details',
  templateUrl: './edit-purchase-return-product-details.component.html',
  styleUrls: ['./edit-purchase-return-product-details.component.css']
})
export class EditPurchaseReturnProductDetailsComponent implements OnInit {
 
  allsupplier: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  templatePayments: any[] = [];
  deletedProducts: any[] = [];
  submitted = false;
  totalReturnBill =0;
  totalReturnAmountPaid =0;
  productDetails :any;
  returnSubTotal = 0;
  totalReturnSubtotal: number = 0;
  returnId = 0;
  editPurchaseReturnProductDetailsForm!: FormGroup;
  displayedColumns: string[] = ['productName', 'Batch', 'Return_Quantity', 'Return_Subtotal','action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  paymentDetails: any;
  constructor(private router: Router,private activateRouter:ActivatedRoute, private api: PurchaseReturnService, private supplierApi: SupplierService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder,private dataService:PurchaseReturnDataService, private batchApi:PosService)
     { 
      this.loadSupplier()
      
     }

  ngOnInit(): void {

    this.editPurchaseReturnProductDetailsForm = this.formBuilder.group({
      supplierId: ['',],
      returnDate: ['',],
    });
    
    this.paymentDetails = this.dataService.getReturnPaymentDetails();
    this.productDetails = this.dataService.getReturnProductDetails();
    if (this.productDetails) {
      this.editPurchaseReturnProductDetailsForm.patchValue({
        supplierId: this.productDetails.supplierId,
        returnDate: this.productDetails.returnDate, 
      });
      this.templateProducts=this.productDetails.productDetails;

      this.deletedProducts = this.productDetails.deletedProducts;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
       this.totalReturnBill=this.productDetails.totalReturnBill;
       this.returnId = this.productDetails.returnId;
    }
    else{
      this.returnId = this.activateRouter.snapshot.queryParams['returnId']
      this.getReturnById()
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
  getReturnById(){
  
    this.api.getPurchaseReturnById(this.returnId).subscribe({
      next:(res)=> {  
        
        this.editPurchaseReturnProductDetailsForm.controls['supplierId'].setValue(res.data.supplierId);
        const formattedDate = this.formatDate(res.data.returnDate);
        this.paymentDetails = res.data.paymentDetails;
        this.editPurchaseReturnProductDetailsForm.controls['returnDate'].setValue(formattedDate);
        this.templatePayments = res.data.payementDetails;
           if (res.data.returnProductData) {
            this.templateProducts = res.data.returnProductData;
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
        
          this.totalReturnBill=res.data.totalReturnBill
        
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

 onMatOptionClicked(product:any) {
  
  let supplierId= Number(this.editPurchaseReturnProductDetailsForm.controls['supplierId'].value);
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
   this.api.getPurchaseByProductIdAndSupplierId(product.productId,supplierId).subscribe({
    next:(res)=>{
      
      this.templateProducts.forEach(function(product){   
        if(product.productId == res.data.productId){
          product.batches = res.data.batches;
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
    this.totalReturnBill -= Number(product.amount);
    // Update the MatTableDataSource
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
  }
  this.allProducts.push(product)
  this.deletedProducts.push(deletedProduct);

}





 
 
 
  continueToPaymentDetails(){
  
    if(this.editPurchaseReturnProductDetailsForm.valid){
      
      this.productDetails = {
        supplierId: this.editPurchaseReturnProductDetailsForm.value.supplierId,
       totalReturnBill: this.calculateTotalReturnAmount(),
       returnDate: this.editPurchaseReturnProductDetailsForm.value.returnDate,
       productDetails: this.templateProducts,
       paymentDetails:this.paymentDetails,
       returnId:this.returnId,
       deletedProducts:this.deletedProducts,
       totalReturnPaid:this.totalReturnAmountPaid,
     };
   
  }
  if(!this.paymentDetails){
    this.paymentDetails = {
      templatePayments: this.templatePayments,
    };
  }
  this.dataService.setReturnProductDetails(this.productDetails);
  this.dataService.setReurnPaymentDetails(this.paymentDetails);
  this.router.navigate(['/edit-purchase-return-payment-details']);
  }
  


  

}
