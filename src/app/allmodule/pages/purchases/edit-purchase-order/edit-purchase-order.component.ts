import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';



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
  orderQuantity:string;

  }


  interface Options3 {
    value: string;
    viewValue: string;
  }
  

  



/*element code*/


const ELEMENT_DATA: PeriodicElement[] = []
//   { Sl_no: '01', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
//   { Sl_no: '01', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
//   { Sl_no: '01', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
//   { Sl_no: '01', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },
//   { Sl_no: '01', Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.', Quantity: 'Enter Here', Current_Stock: '12345' },

@Component({
  selector: 'app-edit-purchase-order',
  templateUrl: './edit-purchase-order.component.html',
  styleUrls: ['./edit-purchase-order.component.css']
})
export class EditPurchaseOrderComponent implements OnInit {
  addUserForm!: FormGroup;
  submitted = false;
  Options3: Options3[] | undefined

  displayedColumns: string[] = ['Sl_no', 'Product_Name', 'Quantity', 'Current_Stock', 'Action',];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  suppliers : any
  purchaseNote = ""
  poId = 0;
  element : any
  id =0

  allProducts: any[] = [];
  templateProducts: any[] = [];
  products: any[] = [];
  

  formData = {
    searchByType: 1,
    searchByValue: '',
  }

  constructor(private formBuilder: FormBuilder ,
    private productService : ProductService ,
    private supplierService : SupplierService ,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private purchaseService : PurchasesService,
    private router: Router,) { }

    ngOnInit(): void {
      var element: any;
      var data: any[] = [];
      this.getAllSuppliers();
      this.addUserForm = this.formBuilder.group({
        supplier: ['', Validators.required],
        pnNumber: ['', Validators.required],
        status: [false, [Validators.required, Validators.email]],
        date: ['', Validators.required],
        purchase_note:['', Validators.required],
      });
    
      this.id = parseInt(this.activatedRoute.snapshot.queryParams['id']);
    
      const request1 = this.purchaseService.getPurchaseOrderById(this.id);
      const request2 = this.productService.getAllProducts(this.formData.searchByType, this.formData.searchByValue);
    

      //To await request2 till request1 gets completed 
      //To filter out products in search input
      
      forkJoin([request1, request2]).subscribe(([response1, response2]) => {
        if (response1['status']) {
          this.element = response1.data;
          const formattedDate = this.formatDate(this.element.poDate);
          this.addUserForm.controls['supplier'].setValue(this.element.supplierId);
          this.addUserForm.controls['pnNumber'].setValue(this.element.poNumber);
          const status = this.element.poStatus === 'Received' ? true : false;
          this.addUserForm.controls['status'].setValue(status);
          this.addUserForm.controls['date'].setValue(formattedDate);
          data = this.element.productData;
          this.dataSource = new MatTableDataSource<PeriodicElement>(data);
          this.templateProducts = this.dataSource.data;
          this.addUserForm.controls['purchase_note'].setValue(this.element.purchaseNote);
        } else {
          this.toastr.error('Something Went Worng');
        }
    
        if (response2.data.length == 0) {
          $('mat-paginator').hide();
          $("#err_msg").show();
          this.allProducts = response2.data;
        } else {
          $("#err_msg").hide();
          $('mat-paginator').show();
          const tempdata = response2.data;
          this.allProducts = tempdata.filter((item: { productId: any; }) =>
            !this.templateProducts.some(data => data.productId === item.productId)
          );
        }
      }, error => {
        this.toastr.error('Something Went Wrong');
      });
    }

  formatDate(dateString: string): string {
    // Assuming dateString is in a different format, adjust the parsing accordingly
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  }

  get f() { return this.addUserForm.controls; }

  

  addUser() {
    this.submitted = true;
    if (!this.addUserForm.valid) {
      return;
    }
  }

  getAllSuppliers() {
    const result = this.supplierService.searchSupplier(1 , "")

    result.subscribe((response: any) => {
      if (response['status']) {
        // this.router.navigate(['product'])

        // alert(response.data.message);

        this.suppliers = response['data'];
        //console.log('All suppliers :' , response['data']);
        //console.log("supplier data",this.suppliers);
      } else {
        alert(`Error while getting : ${response['error']}`);
      }
    });

    
    
  }

  updateQuantity(event: any, product: any) {
    const newValue = event.target.value; // Get the new quantity value
    product.orderQuantity = newValue; // Update the quantity of the product
    console.log(this.templateProducts,"templateproduct");
    
  }

  onQuantityChange(event: any, product: any) {
    const newValue = event.target.value; // Get the new quantity value
    // Update the quantity of the product
    product.orderQuantity = newValue;
    console.log(this.dataSource.data);
    
    
    
  }

  onMatOptionClicked(product: any) {

    this.allProducts = this.allProducts.filter(p => p !== product);
    product.orderQuantity = 0;
    
    this.templateProducts.push(product);
    console.log("before ddatasource",this.templateProducts);
    
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.templateProducts); 

     console.log("ddatasource",this.dataSource.data);
     console.log();
     

  }

  onClickDeleteProductList(product: any) {

    console.log(product);
    
    const index = this.templateProducts.indexOf(product); 
    if (index !== -1) {   
      this.templateProducts.splice(index, 1); 
      // Update the MatTableDataSource
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
    }
    this.allProducts.push(product)

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
        orderQuantity: product.orderQuantity, 
         // Adding purchase note from form value
      };
      purchaseOrderProductDataDTO.push(productData);
    });
  
    const data = {
      "poId":this.id,
      "poNumber": formValue.pnNumber,
      "poDate": formValue.date,
      "supplierIdFk": formValue.supplier,
      "poStatus": poStatus,
      "purchaseNote": formValue.purchase_note,
      "updatePurchaseOrderProductDataDTO": purchaseOrderProductDataDTO
    };
  
    console.log("Data", data);

    const request = this.purchaseService.updatePurchaseOrders(data);
    request.subscribe((response: any) => {
      console.log(response['status']);

      if (response['status']) {
      
        this.toastr.success(`${response['data']}`);
        this.router.navigate(['purchase']);
      }else{
        this.toastr.error("purchase order data already exists");
      }
    });
  
  
  }

}


// this.id = parseInt(this.activatedRoute.snapshot.queryParams['id'])

//     const request = this.purchaseService.getPurchaseOrderById(this.id)

//     request.subscribe((response: any) => {
  
    
//       if (response['status']) {
//         this.element = response.data;


//     const formattedDate = this.formatDate(this.element.poDate);

//     this.addUserForm.controls['supplier'].setValue(this.element.supplierId);
//     this.addUserForm.controls['pnNumber'].setValue(this.element.poNumber);
//     const status = this.element.poStatus === 'Received' ? true : false;


//     this.addUserForm.controls['status'].setValue(status);
//     this.addUserForm.controls['date'].setValue(formattedDate);
    
//     const productData = this.element.productData;

//     this.dataSource = new MatTableDataSource<PeriodicElement>(productData);
    
    

//     this.addUserForm.controls['purchase_note'].setValue(this.element.purchaseNote);
//     //console.log(this.purchaseNote , "dataSource");


    
        
//       } else {
//         this.toastr.error('Something Went Worng');
//       }
//     });