import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExpiredStockOrderSuccessComponent } from '../expired-stock-order-success/expired-stock-order-success.component';
import { ApiService } from 'src/app/allmodule/services/api_services/api.service';
import { PageEvent } from '@angular/material/paginator';
import { ExpireProductService } from 'src/app/allmodule/services/api_services/expire-product.service';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { Constants } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';





export interface PeriodicElement1 {

  productName: string;
  expiredDate: string;

}
const ELEMENT_DATA1: PeriodicElement1[] = [


];

@Component({
  selector: 'app-expired-product-sales',
  templateUrl: './expired-product-sales.component.html',
  styleUrls: ['./expired-product-sales.component.css']
})
export class ExpiredProductSalesComponent implements OnInit {
  //Dialog Reference
  dialogRef: any;
  tempExpireProduct: any;
  AllExpireProduct: any;


  // Add Quotation Template Success Dialog
  expiredStockOrderSuccessDialog() {
    this.dialog.open(ExpiredStockOrderSuccessComponent, {
      width: '617px', height: '306px',
    });
  }
  // Cancel the Dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
  constructor(private expireProductService: ExpireProductService,
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private constants: Constants) { }
  Redirect() {

    this.router.navigate(['/sales'])
  }
  ngOnInit(): void {


    this.loadExpireProduct();
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
  dataSource1 = new MatTableDataSource<PeriodicElement1>();



  loadExpireProduct() {
    //console.log(this.formData.searchByValue);



    // console.log(data);



    this.expireProductService
      .getExpiredProducts(data)
      .subscribe({
        next: (res) => {
          if (res.data.length == 0) {
            this['AllExpireProduct'] = res.data;
            $('mat-paginator').hide();
            $("#err_msg").show();
            this.length = res.data.length;
            this.tempExpireProduct = res.data;
            this.AllExpireProduct = this.tempExpireProduct.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
            this.dataSource1 = new MatTableDataSource<PeriodicElement1>(this.AllExpireProduct);

            //pass the array you want in the table

            return res.status
          } else {
            $("#err_msg").hide();
            $('mat-paginator').show();
            this.length = res.data.length;
            this.tempExpireProduct = res.data;

            this.AllExpireProduct = this.tempExpireProduct.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
            this.dataSource1 = new MatTableDataSource<PeriodicElement1>(this.AllExpireProduct); //pass the array you want in the table

            //console.log( " datasource" , this.dataSource);

            return res.status;
          }
        },
        error: (error) => {
          if (error.error.error) {
            if (error.error.error.code === this.constants.ErrorCodes.EXPIRED_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.EXPIRED_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE)

            }
          } else {
            this.toastr.error(this.constants.Messages.EXPIRED_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE)
          }
        }
      });

  }
}
