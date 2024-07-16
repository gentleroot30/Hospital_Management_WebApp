import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NearExpiryStockOrderSuccessComponent } from '../near-expiry-stock-order-success/near-expiry-stock-order-success.component';
import { ApiService } from 'src/app/allmodule/services/api_services/api.service';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpireProductService } from 'src/app/allmodule/services/api_services/expire-product.service';
import { Constants } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement1 {
  Checked_items:string;
  Product_name: string;
  Expired_Date: string;
  
  }
  const ELEMENT_DATA1: PeriodicElement1[] = [ ];
@Component({
  selector: 'app-near-expire-product-sales',
  templateUrl: './near-expire-product-sales.component.html',
  styleUrls: ['./near-expire-product-sales.component.css']
})
export class NearExpireProductSalesComponent implements OnInit {
 //Dialog Reference
 dialogRef: any;
 AllCategory: any[] = [];
  mainData: any[] = [];
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 30];
  
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  tempNearExpireryProducts: any;
  AllNearExpireryProducts: any;
  daysThreshold:any;
  
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(e);
    this.AllCategory = this.mainData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
  }


 // Add Quotation Template Success Dialog
 nearExpiryStockOrderSuccessDialog() {
   this.dialog.open(NearExpiryStockOrderSuccessComponent,{
     width:'617px',height:'306px',
   });
 }
// Cancel the Dialog
 onNoClick(): void {
   this.dialogRef.close();
 }
  constructor(private expireProductService: ExpireProductService,
     private router:Router,
     private toastr: ToastrService,
     private constants: Constants,
     public dialog: MatDialog) { }
  Redirect(){
    
    this.router.navigate(['/sales'])
  }

  ngOnInit(): void {

    this.loadNearExpireryProducts(this.daysThreshold)
  }
  expandedElement1!: PeriodicElement1 | null;
  displayedColumns1: string[] = ['Product_name','Expired_Date',];
  dataSource1 = new MatTableDataSource < PeriodicElement1 > ();

  loadNearExpireryProducts(daysThreshold:number) {
    //console.log(this.formData.searchByValue);



    // console.log(data);



    this.expireProductService
      .getNearExpireryProducts(daysThreshold)
      .subscribe({
        next: (res) => {
          if (res.data.length == 0) {
            this['AllNearExpireryProducts'] = res.data;
            $('mat-paginator').hide();
            $("#err_msg").show();
            this.length = res.data.length;
            this.tempNearExpireryProducts = res.data;
            this.AllNearExpireryProducts = this.tempNearExpireryProducts.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
            this.dataSource1 = new MatTableDataSource<PeriodicElement1>(this.AllNearExpireryProducts);

            //pass the array you want in the table

            return res.status
          } else {
            $("#err_msg").hide();
            $('mat-paginator').show();
            this.length = res.data.length;
            this.tempNearExpireryProducts = res.data;

            this.AllNearExpireryProducts = this.tempNearExpireryProducts.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
            this.dataSource1 = new MatTableDataSource<PeriodicElement1>(); //pass the array you want in the table

            //console.log( " datasource" , this.dataSource);

            return res.status;
          }
        },
        error: (error) => {
          if (error.error.error) {
            if (error.error.error.code === this.constants.ErrorCodes.NEAR_EXPIRE_PRODUCT_DATA_NOT_FOUND_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.NEAR_EXPIRE_PRODUCT_DATA_NOT_FOUND_ERROR_CODE)

            }
          } else {
            this.toastr.error(this.constants.Messages.NEAR_EXPIRE_PRODUCT_DATA_NOT_FOUND_ERROR_CODE)
          }
        }
      });

  }
}

