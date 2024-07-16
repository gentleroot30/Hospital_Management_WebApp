import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

// Date Range Picker Import Libraries
import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { SalesReturnService } from 'src/app/allmodule/services/api_services/sales-return.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { PageEvent } from '@angular/material/paginator';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSaleReturnComponent } from '../delete-sale-return/delete-sale-return.component';
import { SaleReturnDataService } from 'src/app/allmodule/services/data_services/sale-return-data.service';
import { RoleBaseControlService } from 'src/app/allmodule/services/data_services/role-base-control.service';


@Component({
  selector: 'app-sale-return',
  templateUrl: './sale-return.component.html',
  styleUrls: ['./sale-return.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class SaleReturnComponent implements OnInit {

// Date Range Picker 

ngAfterViewInit(): void {
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
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
  }

  displayedColumns: string[] = ['expand','createdAt', 'returnRefNo', 'customerName', 'totalReturnAmount','paymentDue','totalReturnAmountPaid', 'action'];
 
  // columnsToDisplayWithExpand = [this.displayedColumns];
  expandedElement!: PeriodicElement | null;
  panelOpenState = false;
  formData = {
    searchByType: 1,
    searchByValue : '',
  }

  tempReturnId = 0;
  returnsData:any[]=[];
  tempReturnsData:any[]=[];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  paymentDue = 0;
  paginator: any;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex; 
    this.returnsData=this.tempReturnsData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.returnsData); 
    
  }

  constructor(private api:SalesReturnService,private router:Router,private toaster:ToastrService,
    private constants:Constants,public roleBaseAccess:RoleBaseControlService,public dialog: MatDialog,private dataService:SaleReturnDataService) 
    {
      
      this.searchSaleReturns();
      
     }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchSaleReturns(){
    
    this.api.getAllSalesRetuns(this.formData.searchByType,this.formData.searchByValue).subscribe({
      next:(res)=>{
        
        if(res.data.length == 0){
          this.returnsData = res.data;
          $(".mat-paginator").hide();
          $("#err_msg").show();
          this.length = res.data.length;
          this.returnsData = res.data;
          this.returnsData = this.tempReturnsData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
          this.dataSource = new MatTableDataSource < PeriodicElement > (this.returnsData);
          return res.status
        }
        else{
          $("#err_msg").hide();
          $("mat-paginator").show();
          this. length = res.data.length;
        this.tempReturnsData= res.data;
        this.returnsData=this.tempReturnsData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
        this.dataSource = new MatTableDataSource < PeriodicElement > (this.returnsData);
        return res.status
        }
      },
      error:(error)=>{
      if(error.error.error){
        if(error.error.error.code === this.constants.ErrorCodes.SALES_RETRUN_ALREADY_EXISTS_ERROR_CODE){
          this.toaster.error(this.constants.Messages.SALES_RETURN_ALREADY_EXISTS_MESSAGE)
        }
        else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_SALES_RETRUN_DATA_ERROR_CODE){
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_SALESRETURN_DATA_MESSAGE)
        }
        else {
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_SALESRETURN_DATA_MESSAGE)
        }

      }
      else{
        this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_SALESRETURN_DATA_MESSAGE)
      }
    }
  })
  }





  // Paymentdue span style
  getButtonStyle(paymentDue: number) {
    paymentDue = Number(paymentDue);
    return {
      'background-color': (isNaN(paymentDue) || paymentDue <= 0) ? '#75DA72' : '#ED1C24',
      'color': 'white',
    };
  }
  
  deleteSalesReturn(returnId:number){
    
    this.tempReturnId = returnId;
    this.dialog.open(DeleteSaleReturnComponent,{
      width:'607px',height:'409px',
      data:{salesId:returnId} 
    }).afterClosed().subscribe((res)=>{
      
      if(res.status === true){
        for(let i=0; i< this.tempReturnsData.length; i++){
         if(this.tempReturnsData[i].returnId == this.tempReturnId){
           this.tempReturnsData.splice(i,1);
           break;
         }
        }
        this.returnsData=this.tempReturnsData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
         this.tempReturnId = 0;
         this.toaster.success(this.constants.SuccessMessages.SALESRETURN_DELETED_MESSAGE);
         this.searchSaleReturns();
       
       }
    });
  }

  addNewSaleReturn(){
  
    this.dataService.setReurnPaymentDetails('');
    this.dataService.setReturnProductDetails('');
    this.router.navigate(['/add-sale-return-product-details'])
  }

  viewSaleReturn(returnId:number){
    
    this.dataService.setReurnPaymentDetails('');
    this.dataService.setReturnProductDetails('');
    this.router.navigate(['/view-sale-return-product-details'],{queryParams:{'returnId':returnId}})

  }
  editSaleReturn(returnId:number){
   
    this.dataService.setReurnPaymentDetails('');
    this.dataService.setReturnProductDetails('');
    this.router.navigate(['/edit-sale-return-product-details'],{queryParams:{'returnId':returnId}})

  }

}


export interface PeriodicElement {
 
}

const ELEMENT_DATA: PeriodicElement[] = [];
