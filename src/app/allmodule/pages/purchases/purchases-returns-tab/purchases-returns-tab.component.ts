import { Component, OnInit } from '@angular/core';

//date range picker library
import * as moment from 'moment';
import * as $ from "jquery";
import 'daterangepicker';
import { DeletePurchasesReturnsComponent } from './delete-purchases-returns/delete-purchases-returns.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/allmodule/services/api_services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { PurchaseReturnDataService } from 'src/app/allmodule/services/data_services/purchase-return-data.service';
import { PurchaseReturnService } from 'src/app/allmodule/services/api_services/purchase-return.service';
import { RoleBaseControlService } from 'src/app/allmodule/services/data_services/role-base-control.service';




export interface PeriodicElement2 {
  returnDate: string;
  supplierName: string;
  totalReturnBill: number;
  totalSupplierPendingPayement: string;
  createdBy: string;
}
interface Second2 {
  value: string;
  viewValue: string;
}



const ELEMENT_DATA2: PeriodicElement2[] = [];


@Component({
  selector: 'app-purchases-returns-tab',
  templateUrl: './purchases-returns-tab.component.html',
  styleUrls: ['./purchases-returns-tab.component.css']
})
export class PurchasesReturnsTabComponent implements OnInit {


  sort: any;
  paginator: any;



  //date range start ts
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
    }, function (start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  }

  // Date Range Picker  end ts




  displayedColumns2: string[] = ['returnDate', 'supplierName', 'totalReturnBill', 'totalSupplierPendingPayement', 'createdBy', 'action'];
  dataSource2 = new MatTableDataSource<PeriodicElement2>();
  submitted = false;

  Second2: Second2[] = [
    { value: 'Supplier Name', viewValue: 'Supplier Name' },
    { value: 'returnDate', viewValue: 'returnDate' },
    { value: 'totalReturnBill', viewValue: 'totalReturnBill' },
    { value: 'totalSupplierPendingPayement', viewValue: 'totalSupplierPendingPayement' },
    { value: 'createdBy', viewValue: 'createdBy' },


  ];
  AllPurchaseReturns: any[] = [];
  tempPurchaseReturnsData: any[] = [];
  length = 100;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 30];

  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  tempreturnId: number = 0

  formData = {
    searchByType: 1,
    searchByValue: '',
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.tempPurchaseReturnsData = this.tempPurchaseReturnsData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
    this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.tempPurchaseReturnsData);

  }

  constructor(public dialog: MatDialog,
     private api: PurchaseReturnService, 
     private toaster:ToastrService,
     private constants:Constants,
     private router: Router,
     public roleBaseAccess:RoleBaseControlService,
    private dataService:PurchaseReturnDataService ) {

      this.searchPurchaseReturns();
    
  }



  ngOnInit(): void {

    

    this.dataSource2.paginator = this.paginator
  }
  //payment due button colour start ts
  changeButtonColor(paidUnpaidValidator: string) {
    const button = document.getElementById(paidUnpaidValidator) as HTMLButtonElement;
    const buttonText = button.innerText.trim();

    if (!isNaN(Number(buttonText)) && buttonText !== '') {
      button.style.backgroundColor = '#ED1C24';   //red
    } else {
      button.style.backgroundColor = '#75DA72';  // green
    }
  }


  getButtonStyle(paymentDue: number) {
    paymentDue = Number(paymentDue);
    return {
      'background-color': (isNaN(paymentDue) || paymentDue <= 0) ? '#75DA72' : '#ED1C24',
      'color': 'white',
    };
  }
  //payment due button colour end  ts








  deletePurchasesReturnsDialog(returnId: number) {
      this.tempreturnId = returnId;
      this.dialog.open(DeletePurchasesReturnsComponent, {
        width: '607px', height: '409px',
        data: { rid: returnId }
      })
        .afterClosed().subscribe((res) => {
  
          if (res.status === true) {
            
            if (res.status === true) {
              for (let i = 0; i < this.tempPurchaseReturnsData.length; i++) {
                if (this.tempPurchaseReturnsData[i].returnId == this.tempreturnId) {
                  this.tempPurchaseReturnsData.splice(i, 1);
                  break;
                }
              }
              this.AllPurchaseReturns = this.tempPurchaseReturnsData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
              this.tempreturnId = 0;
              alert("Purchases Return  deleted successfully");
              this.searchPurchaseReturns();
             
  
            }
          }
        })

    
  }


  addNewPurchaseReturn(){
   
    this.dataService.setReurnPaymentDetails('');
    this.dataService.setReturnProductDetails('');
    this.router.navigate(['/add-purchase-return-product-details'])
  }

  viewPurchasesReturnsCall(returnId: number) {
   
    this.dataService.setReurnPaymentDetails('');
    this.dataService.setReturnProductDetails('');
    this.router.navigate(['/view-purchase-return-product-details'], { queryParams: { 'returnId': returnId } })
  }
  editPurchasesReturnsCall(returnId: number) {
    
    this.dataService.setReurnPaymentDetails('');
    this.dataService.setReturnProductDetails('');
    this.router.navigate(['/edit-purchase-return-product-details'], { queryParams: { 'returnId': returnId } })
  }


  searchPurchaseReturns() {
   

    this.api.searchPurchaseReturns(this.formData.searchByType, this.formData.searchByValue).subscribe({
      next: (res) => {



        if (res.data.length == 0) {
          this.AllPurchaseReturns = res.data;
          $(".mat-paginator").hide();
          $("#err_msg").show();
          this.length = res.data.length;
          this.tempPurchaseReturnsData = res.data;
          this.AllPurchaseReturns = this.tempPurchaseReturnsData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.AllPurchaseReturns);
          //pass the array you want in the table

          return res.status
        }
        else {

          $("#err_msg").hide();
          $("mat-paginator").show();
          this.length = res.data.length;
          this.tempPurchaseReturnsData = res.data;
          this.AllPurchaseReturns = this.tempPurchaseReturnsData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.AllPurchaseReturns);
          return res.status
        }
      },
      error:(error)=>{
        if(error.error.error){
         if(error.error.error.code === this.constants.ErrorCodes.PURCHASE_RETURN_ALREADY_EXIST_ERROR_CODE){
           this.toaster.error(this.constants.Messages.PURCHASE_RETURN_ALREADY_EXISTS_MESSAGE)
         }
         else{
           this.toaster.error(this.constants.Messages. FAILED_TO_FETCH_PURCHASE_RETURN_DATA_MESSAGE)
        }
       
       }
       else{
         this.toaster.error(this.constants.Messages. FAILED_TO_FETCH_PURCHASE_RETURN_DATA_MESSAGE)
        }
     }
   })
   }
    






}
