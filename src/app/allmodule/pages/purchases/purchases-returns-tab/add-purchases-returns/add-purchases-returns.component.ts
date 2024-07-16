import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseReturnService } from 'src/app/allmodule/services/api_services/purchase-return.service';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';
import { Constants } from 'src/app/app.constants';




export interface PeriodicElement {
  productName: string;
  productId: number;
  Batch: number;
  Return_Quantity: number;
  Return_Subtotal: number;
  Action: string;
}



const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-add-purchases-returns',
  templateUrl: './add-purchases-returns.component.html',
  styleUrls: ['./add-purchases-returns.component.css']
})
export class AddPurchasesReturnsComponent implements OnInit {

  addPurchasesReturnForm!: FormGroup;

  displayedColumns: string[] = ['productId', 'productName', 'Batch', 'Return_Quantity', 'Return_Subtotal', 'Action',];
  dataSource = new MatTableDataSource<PeriodicElement>();

  submitted = false;
  Allsupplier: any[] = [];
  allProducts: any[] = [];
  templateProducts: any[] = [];

  returnSubTotal = 0;
  totalReturnSubtotal: number = 0;
  totalReturnAmount = 0;
  supplierByProducts: any[] = [];
  productDetailsObject: any;
  productDetails: any;
  totalReturnDataDTO: any;
  totalReturnDataDTOObject: any;
  totalReturnDataDtoObject: any;
  totalReturnBill: any;


  // productId!: number;
  // supplierId!: number;




  constructor(private formBuilder: FormBuilder,
    private api: PurchaseReturnService,
    private http: HttpClient,
    private router: Router,
    private supplierApi: SupplierService,
    private constants: Constants,
    private toaster: ToastrService,
    private dataService: PosDataService,

    public dialog: MatDialog) {
    
    this.loadSupplier()
    
  }




  ngOnInit(): void {

    this.addPurchasesReturnForm = this.formBuilder.group({
      supplierId: ['', Validators.required],

      returnDate: ['', Validators.required],

    });



  }

  get f() { return this.addPurchasesReturnForm.controls; }


  loadSupplier() {

    this.supplierApi.searchSupplier(1, '').subscribe({
      next: (res) => {

        if (res.data.length > 0) {
          this.Allsupplier = res.data;
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
        this.allProducts = Object.values(res.data.products);
      },
      error: (error) => {
        if (error.error.error) {
          if (this.constants.ErrorCodes.PRODUCT_ID_DOES_NOT_EXISTS_ERROR_CODE) {
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
          }
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
        }

        this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)


      }

    })
  }

  onMatOptionClicked(product: any) {

    let supplierId = Number(this.addPurchasesReturnForm.controls['supplierId'].value);
    this.allProducts = this.allProducts.filter(p => p !== product);
    this.api.getPurchaseByProductIdAndSupplierId(product.productId, supplierId).subscribe({
      next: (res) => {
        this.templateProducts = res.data;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts)
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

  onClickDeleteProductList(product: any) {
    const index = this.templateProducts.indexOf(product);
    if (index !== -1) {
      this.templateProducts.splice(index, 1);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    }
  }


  calculateReturnSubtotal(product: any): number {
    if (!product.returnQuantity || isNaN(product.returnQuantity)) {
      return product.batchData.mrpPerPack;
    }
    return product.returnQuantity * product.batchData.mrpPerPack;
  }

  calculateTotalReturnSubtotal(): number {
    let total = 0;
    for (const product of this.templateProducts) {
      total += this.calculateReturnSubtotal(product);
    }
    return total;
  }

  addReturnQuantity(value: any, product: any) {

    if (value == '' || value == null) {
      value = 0;
      return;
    }

    product.returnQuantity = value

  }




  addPurchasesReturn() {
    this.submitted = true;
    if (this.addPurchasesReturnForm.valid) {

      this.api.addPurchaseReturn(this.addPurchasesReturnForm.value).subscribe({
        next: (res) => {
          alert("PurchasesReturn added succefully");
          this.router.navigate(['/purchase'])

        },
        error: (err) => {
          alert('Something went wrong');
          console.log(err);
        }
      })
    }
  }



}


