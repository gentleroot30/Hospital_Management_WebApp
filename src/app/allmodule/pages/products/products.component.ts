import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'daterangepicker';

import { Route } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api_services/api.service';
import { ProductService } from '../../services/api_services/product.service';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';

export interface PeriodicElement {
  productName: string;
  currentStock: number;
  customField1: string;
  customField2: string;
  customField3: string;
}
interface Options {
  value: string;
  viewValue: string;
}
interface FormData {
  searchByType: number;
  searchByValue: string;
  fromtDate: string | null;
  totDate: string | null;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ProductsComponent implements OnInit,AfterViewInit {
  row: any;
  sort: any;
  paginator: any;

  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  GetAllBrands: any[] = [];
  AllBrands: any[] = [];

  AllProducts: any[] = [];
  tempProducts: any[] = [];

  tempproductId: number = 0;

  columnsToDisplay: string[] = [
    'expand',
    'productName',
    'currentStock',
    'customField1',
    'customField2',
    'customField3',
    'action',
  ];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  expandedElement!: PeriodicElement | null;
  panelOpenState = false;
  submitted = false;



  formData: FormData = {
    searchByType: 1,
    searchByValue: '',
    fromtDate: null,
    totDate: null,
  };
  ngAfterViewInit() {
    $('input[name="daterange"]').daterangepicker({
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      opens: 'left',
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, (start, end) => {
      this.handleDateRangeSelection({ startDate: start, endDate: end });
    });
  }

  displayedColumns: string[] = [
    'expand',
    'productName',
    'currentStock',
    'customField1',
    'customField2',
    'customField3',
    'action',
  ];
  //dataSource = ELEMENT_DATA;
  // dataSource = new MatTableDataSource < PeriodicElement > ();
  Options: Options[] = [
    { value: 'Product name', viewValue: 'Product name' },
    { value: 'Category', viewValue: 'Category' },
    { value: 'Brand', viewValue: 'Brand' },
  ];

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService,
    public roleBaseAccess:RoleBaseControlService,
  ) 
  {
    this.loadProducts();
    
  }

  ngOnInit(): void {
 
   
    this.dataSource.paginator = this.paginator
  }
  handleDateRangeSelection(event: any) {
    const selectedDateRange = event;
    if (selectedDateRange) {
      this.formData.fromtDate = selectedDateRange.startDate ? new Date(selectedDateRange.startDate).toISOString() : null;
      this.formData.totDate = selectedDateRange.endDate ? new Date(selectedDateRange.endDate).toISOString() : null;
    } else {
      this.formData.fromtDate = null;
      this.formData.totDate = null;
    }
    this.loadProducts();
  }
  //Array for Storing the data
  

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.AllProducts = this.tempProducts.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.AllProducts);

    
  }

  deleteProductDialog(element: any): void {
   
      this.tempproductId = element.productId;
      this.dialog
        .open(DeleteProductComponent, {
          width: '604px',
          height: '391px',
          data: element,
        })
        .afterClosed()
        .subscribe((res) => {
          console.log('AllProduct length ' + this.AllProducts.length);
          console.log(this.tempproductId);
  
          if (res === true) {
            for (let i = 0; i < this.AllProducts.length; i++) {
              if (this.AllProducts[i].productId == this.tempproductId) {
                this.AllProducts.splice(i, 1);
                break;
              }
            }
            this.AllProducts = this.AllProducts.slice(
              this.pageSize * this.pageIndex,
              this.pageSize * this.pageIndex + this.pageSize
            );
            this.tempproductId = 0;
            this.length = this.AllProducts.length;
            // alert("Product deleted successfully");
            //this.toastr.success("Product deleted successfully");
  
            this.loadProducts();
          } else {
            //alert("Something Went Worng")
            this.toastr.error('Something Went Worng');
          }
        });
  
    
   
  }

 

  loadProducts() {
    const fromtDate = this.formData.fromtDate ? new Date(this.formData.fromtDate).toISOString() : undefined;
    const totDate = this.formData.totDate ? new Date(this.formData.totDate).toISOString() : undefined;
    this.productService
      .getAllProducts(this.formData.searchByType, this.formData.searchByValue,fromtDate, totDate)
      .subscribe({
        next: (res) => {
          if (res.data.length == 0) {
            this.AllProducts = res.data;
            $('mat-paginator').hide();
            $("#err_msg").show();
            this. length = res.data.length;
            this.tempProducts= res.data;
            this.AllProducts=this.tempProducts.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.dataSource = new MatTableDataSource < PeriodicElement > (this.AllProducts);
             //pass the array you want in the table
            return res.status
          } else {
            $("#err_msg").hide();
            $('mat-paginator').show();
            this.length = res.data.length;
            this.tempProducts = res.data;
            this.AllProducts = this.tempProducts.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.dataSource = new MatTableDataSource<PeriodicElement>(this.AllProducts); //pass the array you want in the table
            console.log(this.dataSource);
            return res.status;
          }
        },
        error: (error) => {
          //alert("something went wrong");
          this.toastr.error('something went wrong');
        },
      });

  }

  addProducts(){
      this.router.navigate(['/add-product'])
  }



  onViewProducts(element: any) {
      this.router.navigate(['view-product'], {
        queryParams: { id: element['productId'] },
      }); 
    
  }

  onEditProducts(element: any) { 
      this.router.navigate(['edit-product'], {
        queryParams: { id: element['productId'] },
      });
   
  }

  viewPurchaseHistory(productId:number){
    this.router.navigate(['/purchase-history'],{queryParams:{'productId':productId}})
  }
}
