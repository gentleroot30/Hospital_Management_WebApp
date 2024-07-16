import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Date Range Picker Import Libraries
import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { DeleteQuotationComponent } from './delete-quotation/delete-quotation.component';
import { LoadingService } from './loading.service';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { SalesService } from '../../services/api_services/sales.service';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';

interface FormData {
  searchByType: number;
  searchByValue: string;
  fromtDate: string | null;
  totDate: string | null;
}


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('detailExpand1', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('detailExpand2', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SalesComponent implements OnInit, AfterViewInit {
  dialogRef: any;
  formData: FormData = {
    searchByType: 1,
    searchByValue: '',
    fromtDate: null,
    totDate: null
  };
  tempQuotationId = 0;

  quotationData:any[]=[];
  tempQuotationData:any[]=[]
  searchColumns: string[] = ['customerName','customerContactNo','customerCategoryName','ethnicity','address','quotationNo'];
  displayedColumns: string[] = ['expand','createdAt', 'customerCategoryName', 'customerName','ethnicity', 'address', 'action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
 
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

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.quotationData = this.tempQuotationData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.quotationData);
  }

  // Date Range Picker 
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
 

  Options: Options[] = [
    { value: 'Customer Name', viewValue: 'Customer Name' },
    { value: 'Contact Number', viewValue: 'Contact Number' },
    { value: 'Customer Category', viewValue: 'Customer Category' },
    { value: 'Ethnicity', viewValue: 'Ethnicity' },
    { value: 'Address', viewValue: 'Customer Category' },
    { value: 'Quotation No', viewValue: 'Quotation No' },
  ];

  constructor(public dialog: MatDialog, public roleBaseAccess:RoleBaseControlService,private api:SalesService,private router:Router,private toaster:ToastrService,
    private constants:Constants ) {
    this.searchQuotations();
   }

  DeleteQuotation(quotationId:number) {

      this.tempQuotationId = quotationId;
      this.dialog.open(DeleteQuotationComponent,{
        width:'607px',height:'350px',
        data:{qci:quotationId} 
      }).afterClosed().subscribe((res)=>{
        if(res.status === true){
        
          for(let i=0; i< this.tempQuotationData.length; i++){
           if(this.tempQuotationData[i].QUOTATION_TEMPLATEId == this.tempQuotationId){
             this.tempQuotationData.splice(i,1);
             break;
           }
          }
       
          this.quotationData=this.tempQuotationData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
           this.tempQuotationId = 0;
           this.toaster.success(this.constants.SuccessMessages.QUOTATION_DELETED_MESSAGE);
           this.searchQuotations();
         
         }
      });
  

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
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
    this.searchQuotations();
  }


  searchQuotations() {
    const fromtDate = this.formData.fromtDate ? new Date(this.formData.fromtDate).toISOString() : undefined;
    const totDate = this.formData.totDate ? new Date(this.formData.totDate).toISOString() : undefined;
    this.api.getQuotation(this.formData.searchByType, this.formData.searchByValue, fromtDate, totDate).subscribe({
      next: (res) => {
        if (res.data.length == 0) {
          this.quotationData = res.data;
          $(".mat-paginator").hide();
          $("#err_msg").show();
          this.length = res.data.length;
          this.tempQuotationData = res.data;
          this.quotationData = this.tempQuotationData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.quotationData);
          return res.status;
        } else {
          $("#err_msg").hide();
          $("mat-paginator").show();
          this.length = res.data.length;
          this.tempQuotationData = res.data;
          this.quotationData = this.tempQuotationData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.quotationData);
          return res.status;
        }
      },

    error:(error)=>{
   if(error.error.error){
    if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_QUOTATION_DATA_ERROR_CODE){
      this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_QUOTATION_DATA_MESSAGE)
    }
    else if (error.error.error.code === this.constants.ErrorCodes.QUOTATION_ALREADY_EXISTS_ERROR_CODE){
      this.toaster.error(this.constants.Messages.QUOTATION_TEMPLATE_ALREADY_EXISTS_MESSAGE)
    }
   }
   else{
    this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_QUOTATION_DATA_MESSAGE)
   }
    }
   })

}
applyFilter(event: Event,columnName: string) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    const colName =this.searchColumns[this.formData.searchByType-1];
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const cellValue = data[colName].toString().toLowerCase();
      return cellValue.includes(filter.trim().toLowerCase());
    };  
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
     
  }

  addQuoation(){
  
      this.router.navigate(['/add-quotation'])
  }

  viewQuotationCall(quotationId:number){
  
    this.router.navigate(['/view-quotation'],{queryParams:{'quotationId':quotationId}})

  }
  editQuotationCall(quotationId:number){
   
    this.router.navigate(['/edit-quotation'],{queryParams:{'quotationId':quotationId}})

  }
}
export interface PeriodicElement {
  dateandtime: string;
  category: string;
  customerName: string;
  ethnicity:string;
  address:string;
  contact_no:string;
  quotation_no:string;
  }

  interface Options {
    value: string;
    viewValue: string;
  }
  








 

