import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
// Date Range Picker Import Libraries
import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { MatDialog } from '@angular/material/dialog';
import { DeletePosComponent } from '../delete-pos/delete-pos.component';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';
import { PosDataService } from 'src/app/allmodule/services/data_services/pos-data.service';

import { RoleBaseControlService } from 'src/app/allmodule/services/data_services/role-base-control.service';


interface FormData {
  searchByType: number;
  searchByValue: string;
  fromtDate: string | null;
  totDate: string | null;
}

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PosComponent implements OnInit {

// Date Range Picker 
 
 formData: FormData = {

    searchByType: 1,
    searchByValue: '',
    fromtDate: null,
    totDate: null
  };

  tempSalesId = 0;
  posData: any[] = [];
  tempposData: any[] = [];
  searchColumns: string[] = ['customerName', 'customerContactNo', 'customerCategoryName'];
  displayedColumns: string[] = ['expand', 'createdAt', 'customerCategoryName', 'customerName', 'totalBill', 'paymentDue', 'totalPaid', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  expandedElement!: PeriodicElement | null;
  panelOpenState = true;
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  paginator: any;


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
    }, (start, end) => {
      this.handleDateRangeSelection({ startDate: start, endDate: end });
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.posData = this.tempposData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.posData);
  }

  constructor(public dialog: MatDialog,public roleBaseAccess:RoleBaseControlService,private api:PosService, private router:Router, private toaster:ToastrService,private constants:Constants,private dataService:PosDataService) {
   this.searchPos();
   
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
    this.searchPos();
  }

  changeButtonColor(paidUnpaidValidator: string) {
    const button = document.getElementById(paidUnpaidValidator) as HTMLButtonElement;
    const buttonText = button.innerText.trim();

    if (!isNaN(Number(buttonText)) && buttonText !== '') {
      button.style.backgroundColor = '#ED1C24'; // red
    } else {
      button.style.backgroundColor = '#75DA72'; // green
    }
  }

  getButtonStyle(paymentDue: number) {
    paymentDue = Number(paymentDue);
    return {
      'background-color': (isNaN(paymentDue) || paymentDue <= 0) ? '#75DA72' : '#ED1C24',
      'color': 'white',
    };
  }

  searchPos() {
    const fromtDate = this.formData.fromtDate ? new Date(this.formData.fromtDate).toISOString() : undefined;
    const totDate = this.formData.totDate ? new Date(this.formData.totDate).toISOString() : undefined;
    this.api.getPos(this.formData.searchByType, this.formData.searchByValue, fromtDate, totDate).subscribe({
      next: (res) => {
        if (res.data.length == 0) {
          this.posData = res.data;
          $(".mat-paginator").hide();
          $("#err_msg").show();
          this.length = res.data.length;
          this.posData = res.data;
          this.posData = this.tempposData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.posData);
          return res.status;
        } else {
          $("#err_msg").hide();
          $("mat-paginator").show();
          this.length = res.data.length;
          this.tempposData = res.data;
          this.posData = this.tempposData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.posData);
          return res.status;
        }
      },
      error:(error)=>{
       if(error.error.error){
        if(error.error.error.code === this.constants.ErrorCodes.POS_ALREADY_EXISTS_ERROR_CODE){
          this.toaster.error(this.constants.Messages.POS_ALREADY_EXISTS_MESSAGE)
        }
        else{
          this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_POS_DATA_MESSAGE)
       }
      
      }
      else{
        this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_POS_DATA_MESSAGE)
       }
    }
  })
  }
 
 

  DeletePos(salesId:number){
      this.tempSalesId = salesId;
      this.dialog.open(DeletePosComponent,{
        width:'607px',height:'350px',
        data:{salesid:salesId} 
      }).afterClosed().subscribe((res)=>{
        
        if(res.status === true){
          for(let i=0; i< this.tempposData.length; i++){
           if(this.tempposData[i].QUOTATION_TEMPLATEId == this.tempSalesId){
             this.tempposData.splice(i,1);
             break;
           }
          }
          this.posData=this.tempposData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
           this.tempSalesId = 0;
           this.toaster.success("Sales Deleted successfully");
           this.searchPos();
         
         }
      });
    
    
  }

  addPos(){
    
    this.dataService.setPaymentDetails('');
    this.dataService.setProductDetails('');
    this.router.navigate(['/add-pos-product-details'])
  }

  viewPosCall(salesId:number){
  
    this.router.navigate(['/view-pos-productdetails'],{queryParams:{'salesId':salesId}})

  }
  editPosCall(salesId:number){
   
    this.dataService.setPaymentDetails('');
    this.dataService.setProductDetails('');
    this.router.navigate(['/edit-pos-product-details'],{queryParams:{'salesId':salesId}})

  }

  
  
  }

export interface PeriodicElement {
  
  }
const ELEMENT_DATA: PeriodicElement[] = [];