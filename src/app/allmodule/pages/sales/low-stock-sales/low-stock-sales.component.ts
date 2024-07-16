import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LowStockOrderSuccessComponent } from '../low-stock-order-success/low-stock-order-success.component';
import { ApiService } from 'src/app/allmodule/services/api_services/api.service';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpireProductService } from 'src/app/allmodule/services/api_services/expire-product.service';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';





export interface PeriodicElement1 {

  productName: string;
  expiredDate: string;

}
const ELEMENT_DATA1: PeriodicElement1[] = [
 

];
@Component({
  selector: 'app-low-stock-sales',
  templateUrl: './low-stock-sales.component.html',
  styleUrls: ['./low-stock-sales.component.css']
})
export class LowStockSalesComponent implements OnInit {

  //Dialog Reference
  dialogRef: any;
  tempLowerProduct: any;
  AllLowerProduct: any;


    // Add Quotation Template Success Dialog
    lowStockOrderSuccessDialog() {
      this.dialog.open(LowStockOrderSuccessComponent,{
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

    this.loadLowerProduct();
  }
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
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(e);
    this.AllCategory = this.mainData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
  }
  expandedElement1!: PeriodicElement1 | null;
  displayedColumns1: string[] = ['productName', 'expiredDate',];
  dataSource1 = new MatTableDataSource < PeriodicElement1 > ();

  loadLowerProduct() {
    //console.log(this.formData.searchByValue);



    // console.log(data);



    this.expireProductService
      .getLowerProducts(data)
      .subscribe({
        next: (res) => {
          if (res.data.length == 0) {
            this['AllLowerProduct'] = res.data;
            $('mat-paginator').hide();
            $("#err_msg").show();
            this.length = res.data.length;
            this.tempLowerProduct = res.data;
            this.AllLowerProduct = this.tempLowerProduct.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
            this.dataSource1 = new MatTableDataSource<PeriodicElement1>(this.AllLowerProduct);

            //pass the array you want in the table

            return res.status
          } else {
            $("#err_msg").hide();
            $('mat-paginator').show();
            this.length = res.data.length;
            this.tempLowerProduct = res.data;

            this.AllLowerProduct = this.tempLowerProduct.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
            this.dataSource1 = new MatTableDataSource<PeriodicElement1>(this.AllLowerProduct); //pass the array you want in the table

            //console.log( " datasource" , this.dataSource);

            return res.status;
          }
        },
        error: (error) => {
          if (error.error.error) {
            if (error.error.error.code === this.constants.ErrorCodes.LOW_STOCK_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.NEAR_EXPIRE_PRODUCT_DATA_NOT_FOUND_ERROR_CODE)

            }
          } else {
            this.toastr.error(this.constants.Messages.NEAR_EXPIRE_PRODUCT_DATA_NOT_FOUND_ERROR_CODE)
          }
        }
      });

  }
}











