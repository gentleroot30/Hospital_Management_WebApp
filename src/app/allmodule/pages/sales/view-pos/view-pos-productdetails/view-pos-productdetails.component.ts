import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { Constants } from 'src/app/app.constants';
import { PeriodicElement } from '../../sales.component';

@Component({
  selector: 'app-view-pos-productdetails',
  templateUrl: './view-pos-productdetails.component.html',
  styleUrls: ['./view-pos-productdetails.component.css']
})
export class ViewPosProductdetailsComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'Batch', 'quantity', 'amount',];
  allCustomer:any[]=[];
  allProducts:any[] = [];
  templateProducts:any[]=[];

  salesId:number = 0;
  totalBill:number=0;
  productDetailsObject :any;
 customerId:number=0;

 editPosProductDetailsForm!:FormGroup;
 paymentDetails:any[]=[];
  submitted = false;
  formData = {
    searchByType: 1,
    searchByValue: '',
  }
  constructor(private router:Router, private api:PosService,  private activateRouter:ActivatedRoute,private customerApi:CustomersService, private productApi:ProductService, 
    private constants:Constants,private toaster:ToastrService,private formBuilder:FormBuilder,private dataService:PosDataService) 
    {
      this.loadCustomers();
      this.getProductList();
     }
     dataSource = new MatTableDataSource < PeriodicElement > ();

  ngOnInit(): void {

    this.editPosProductDetailsForm = this.formBuilder.group({
      customerId: ['', ],
      posDate: ['',],
    });

   

    
    this.salesId = this.activateRouter.snapshot.queryParams['salesId']
    this.api.getPosById(this.salesId).subscribe({
      next: (res) => {

        this.editPosProductDetailsForm.controls['customerId'].setValue(res.data.customerId);
        const formattedDate = this.formatDate(res.data.posDate);
        this.editPosProductDetailsForm.controls['posDate'].setValue(formattedDate);
        this.paymentDetails = res.data.payementDetails;
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

    this.paymentDetails = this.dataService.getPaymentDetails();
    this.productDetailsObject = this.dataService.getProductDetails();
    this.editPosProductDetailsForm.patchValue({
      customerId: this.productDetailsObject.customerId,
      // posDate: this.productDetailsObject?.posDate?new Date(this.productDetailsObject?.posDate):new Date(),
       posDate: this.productDetailsObject.posDate, 
       
      });
      if(this.productDetailsObject){
        this.templateProducts=this.productDetailsObject.productDetails;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
       this.totalBill=this.productDetailsObject.totalBill
      
   }



  }
  formatDate(dateString: string): string {
    let newDate = new Date(dateString);
    const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
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
sendPaymentDetails(){
  
  this.dataService.setPaymentDetails(this.paymentDetails);
}


  get f() { return this.editPosProductDetailsForm.controls; }
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
    this.productApi.getAllProducts(this.formData.searchByType, this.formData.searchByValue).subscribe({
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
        product.amount = product.salesQuantity * batch.mrpPerPack;
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

  continueToPayment(){
    if (this.templateProducts.length === 0) {
      this.toaster.error('Please add products before saving.');
      return; 
    }
   

    this.submitted = true;
    if(this.editPosProductDetailsForm.valid){
    
       this.productDetailsObject = {
        salesId:this.salesId,
        customerId: this.editPosProductDetailsForm.value.customerId,
        totalBill: this.calculateTotalAmount(),
        totalDiscount:this.calculateTotalDiscount(),
        posDate: this.editPosProductDetailsForm.value.posDate,
        productDetails: this.templateProducts,
        paymentDetails:this.paymentDetails,
        payable:this.calculatePayableAmount()
      };
      
      this.dataService.setProductDetails(this.productDetailsObject);
      this.router.navigate(['/view-pos-paymentdetails']);
      
    }
    
   }

}
