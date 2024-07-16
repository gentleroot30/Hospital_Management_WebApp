import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { Constants } from 'src/app/app.constants';
import { PeriodicElement } from '../../sales.component';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';
import { data } from 'jquery';

@Component({
  selector: 'app-edit-pos-product-details',
  templateUrl: './edit-pos-product-details.component.html',
  styleUrls: ['./edit-pos-product-details.component.css']
})
export class EditPosProductDetailsComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'Batch', 'quantity', 'amount', 'action'];
  allCustomer: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];
  templatePayments: any[] = [];
  deletedProducts: any[] = [];
  //deletedPayments: any[] = [];
  productDetails: any;
  paymentDetails:any;
  
  salesId: number = 0;
  totalBill: number = 0;


  customerId: number = 0;

  editPosProductDetailsForm!: FormGroup;

  submitted = false;
  formData = {
    searchByType: 1,
    searchByValue: '',
  }
  constructor(private router: Router, private api: PosService, private activateRouter: ActivatedRoute, private customerApi: CustomersService, private productApi: ProductService,
    private constants: Constants, private toaster: ToastrService, private formBuilder: FormBuilder, private dataService: PosDataService) {
    
    this.loadCustomers();
    this.getProductList();

  }
  dataSource = new MatTableDataSource<PeriodicElement>();

  ngOnInit(): void {

    this.editPosProductDetailsForm = this.formBuilder.group({
      customerId: ['',],
      posDate: ['',],


    });
    
    this.paymentDetails = this.dataService.getPaymentDetails();
    this.productDetails = this.dataService.getProductDetails();
    if (this.productDetails) {
      this.editPosProductDetailsForm.patchValue({
        customerId: this.productDetails.customerId,
        posDate: this.productDetails.posDate, 
      });

      this.templateProducts=this.productDetails.templateProducts;
      
      this.deletedProducts = this.productDetails.deletedProducts;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
       this.totalBill=this.productDetails.totalBill;
       this.salesId = this.productDetails.salesId;
    }
    else{
      this.salesId = this.activateRouter.snapshot.queryParams['salesId']
      this.getPosById()
    }
  }

  getPosById(){
    this.api.getPosById(this.salesId).subscribe({
      next: (res) => {
        
        this.editPosProductDetailsForm.controls['customerId'].setValue(res.data.customerId);
        const formattedDate = this.formatDate(res.data.posDate);
        this.editPosProductDetailsForm.controls['posDate'].setValue(formattedDate);
        this.templatePayments = res.data.payementDetails;
        if (res.data.productDetails) {
          this.templateProducts = res.data.productDetails;
          for (var templateProduct of this.templateProducts) {
            templateProduct.salesQuantity = templateProduct.quantity;
            templateProduct.selectedBatchId = templateProduct.batchId;
            this.getBatchesForProduct(templateProduct.productId)
            for (var product of this.allProducts) {
              if (templateProduct.productId == product.productId) {
                this.allProducts = this.allProducts.filter(p => p !== product);
              }
            }
          }

          this.totalBill = res.data.totalBill
        }
       
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);

      }
    })
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

  formatDate(dateString: string): string {
    let newDate = new Date(dateString);
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  }

  // sendTemplateProducts() {
  //   this.paymentDetails.templatePayments = this.templatePayments;
  //   this.dataService.setPaymentDetails(this.paymentDetails);
  // }


  get f() { return this.editPosProductDetailsForm.controls; }
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

  onMatOptionClicked(product: any) {
    
    this.allProducts = this.allProducts.filter(p => p !== product);
    let tempProduct = {
      "productId": product.productId,
      "batchId": 0,
      "productName": product.productName,
      "salesQuantity": 0,
      "amount": 0,
      "discountPercent":0,
      "selectedBatchId": 0,
      "opType": 1,
    }
    this.templateProducts.push(tempProduct);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    this.api.getBatchesByProductId(product.productId).subscribe({
      next: (res) => {

        this.templateProducts.forEach(function (product) {

          if (product.productId == res.data.productsbatches[0].productId) {
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

    if (product.opType !== 1) {
      product.opType = 2;
    }
   
    for (const batch of product.batches) {

      if (product.selectedBatchId == batch.batchId) {
        product.batchId = batch.batchId;
        product.amount = product.salesQuantity * batch.mrpPerPack;
        return;
      }

    }

  }
  calculateSubTotalFromBatchDropdown(batchId: any, product: any) {

    if (product.salesQuantity <= 0) {
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
        product.amount =product.salesQuantity * batch.mrpPerPack;
        return;
      }

    }

  }

  calculateTotalAmount(): number {
    let total = 0;
    for (const product of this.templateProducts) {
      total += product.amount;
    
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
    
    let deletedProduct = {
      "productId": product.productId,
      "batchId": product.batchId,
      "opType": 3,
    }
    const index = this.templateProducts.indexOf(product);
    if (index !== -1) {
      this.templateProducts.splice(index, 1);
      this.totalBill -= Number(product.amount);
      // Update the MatTableDataSource
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    }
    
    this.allProducts.push(product)
    this.deletedProducts.push(deletedProduct);
    

  }


  continueToPayments() {
    
    if (this.templateProducts.length === 0) {
      this.toaster.error('Please add products before saving.');
      return;
    }

  

    
    this.submitted = true;
    if (this.editPosProductDetailsForm.valid) {
     
      this.productDetails={

      salesId:this.salesId,
      customerId:this.editPosProductDetailsForm.value.customerId,
      totalBill: this.calculateTotalAmount(),
      posDate: this.editPosProductDetailsForm.value.posDate,
       totalDiscount:this.calculateTotalDiscount(),
      templateProducts: this.templateProducts,
      deletedProducts:this.deletedProducts,
      payable:this.calculatePayableAmount()
      
      }
      
      if(!this.paymentDetails){
        this.paymentDetails = {
          templatePayments: this.templatePayments,
        };
      }
     

      this.dataService.setProductDetails(this.productDetails);
      this.dataService.setPaymentDetails(this.paymentDetails);
      
      this.router.navigate(['/edit-pos-payment-details']);

    }

  }
}

