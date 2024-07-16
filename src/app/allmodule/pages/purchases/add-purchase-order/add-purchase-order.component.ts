import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../../user/add-user/add-user.component';
import { AddPurchaseOrderSubmitComponent } from '../add-purchase-order-submit/add-purchase-order-submit.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';


export interface PeriodicElement {
  productId: number;
  productName: string;
  brandId: number;
  brandName: string;
  productCategoryId: number;
  productCategoryName: string;
  alertQuantity: number;
  sequenceStoring: string;
  discountPercent: number;
  quantity: string;
  amount: number;
  orderedQuantity: number;
}
interface Options {
  value: number;
  viewValue: string;
}


const ELEMENT_DATA: PeriodicElement[] = []
//   { Sl_no: '01', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
//   { Sl_no: '02', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
//   { Sl_no: '03', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
//   { Sl_no: '04', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
//   { Sl_no: '05', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
// ];

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.css']
})
export class AddPurchaseOrderComponent implements OnInit {

  dialogRef: any;

  displayedColumns: string[] = ['Sl_no', 'Product_Name', 'Quantity', 'Current_Stock', 'Action',];
  dataSource = new MatTableDataSource<PeriodicElement>();
  Options: Options[] = [
    { value: 1, viewValue: 'Supplier Name' },
    { value: 2, viewValue: 'PN' },
  ];

  addPurchaseOrderForm!: FormGroup;
  submitted = false;
  addUserForm: any;

  api: any;
  router: any;
  suppliers: any
  allProducts: any[] = [];
  templateProducts: any[] = [];
  products: any[] = [];

  formData = {
    searchByType: 1,
    searchByValue: '',
  }
  /* Options3: Options3[] | undefined*/

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private productService: ProductService,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private purchaseService: PurchasesService) {
  }


  ngOnInit(): void {

    this.getAllSuppliers()

    this.addUserForm = this.formBuilder.group({
      supplier: ['', Validators.required],
      pnNumber: ['', Validators.required],
      status: [false,],
      date: ['', Validators.required],
      purchase_note: ['', Validators.required],
    });

    this.productService
      .getAllProducts(this.formData.searchByType, this.formData.searchByValue)
      .subscribe({
        next: (res) => {
          if (res.data.length == 0) {
            //this.AllProducts = res.data;
            $('mat-paginator').hide();
            $("#err_msg").show();

            this.allProducts = res.data;
            //pass the array you want in the table

            return res.status
          } else {
            $("#err_msg").hide();
            $('mat-paginator').show();

            // this.AllProducts = this.tempProducts.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.allProducts = res.data; //pass the array you want in the table
            console.log(this.allProducts);

            return res.status;
          }
        },
        error: (error) => {
          //alert("something went wrong");
          this.toastr.error('something went wrong');
        },
      });
  }

  get f() { return this.addUserForm.controls; }

  addUser() {
    this.submitted = true;
    if (!this.addUserForm.valid) {
      return;
    }
  }

  Redirect() {
    this.api.purchase = 1;
    this.router.navigate(['/purchase'])
  }

  AddPurchaseOrderSubmit() {
    const products = this.dataSource.data;
    const formValue = this.addUserForm.value;
    const poStatus = formValue.status ? 'Received' : 'Not Received';

    // Initialize purchaseOrderProductDataDTO as an empty array
    const purchaseOrderProductDataDTO: {
      productIdFk: number; orderQuantity: string; // Adding purchase note from form value
    }[] = [];

    products.forEach(product => {
      const productData = {
        productIdFk: product.productId,
        orderQuantity: product.quantity,
        // Adding purchase note from form value
      };
      purchaseOrderProductDataDTO.push(productData);
    });

    const data = {
      "poNumber": formValue.pnNumber,
      "poDate": formValue.date,
      "supplierIdFk": formValue.supplier,
      "poStatus": poStatus,
      purchaseNote: formValue.purchase_note,
      "purchaseOrderProductDataDTO": purchaseOrderProductDataDTO
    };

    const request = this.purchaseService.addPurchaseOrders(data);
    request.subscribe((response: any) => {

      if (response['status']) {

        this.toastr.success(`${response['data']}`);
      } else {
        this.toastr.error("purchase order data already exists");
      }
    });

    this.dialog.open(AddPurchaseOrderSubmitComponent, {
      width: '607px', height: '650px',
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllSuppliers() {
    const result = this.supplierService.searchSupplier(1, "")
    result.subscribe((response: any) => {
      if (response['status']) {
        // this.router.navigate(['product'])
        this.suppliers = response['data'];
        //console.log('All suppliers :' , response['data']);
        console.log("supplier data", this.suppliers);

      } else {
        this.toastr.error(`Error while getting : ${response['error']}`);
      }
    });
  }

  onMatOptionClicked(product: any) {
    this.allProducts = this.allProducts.filter(p => p !== product);
    this.templateProducts.push(product);
    product.orderedQuantity = 0;
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
  }

  onQuantityChange(event: any, product: any) {
    const newValue = event.target.value; // Get the new quantity value
    product.orderedQuantity = newValue; // Update the quantity of the product
    console.log(this.templateProducts, "templateproduct");
  }

  onClickDeleteProductList(product: any) {
    const index = this.templateProducts.indexOf(product);
    if (index !== -1) {
      this.templateProducts.splice(index, 1);
      // Update the MatTableDataSource
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    }
    this.allProducts.push(product)
  }

}

