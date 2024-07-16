import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';
import {animate, state, style, transition, trigger} from '@angular/animations'


// DateRangepicker Imports

import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import { Route, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { CustomersService } from '../../services/api_services/customers.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';

export interface PeriodicElement {
  categoryId :string;
  customerName: string;
  contactNo_1: string;
  ethnicity: string;
  address: string;
  }

  interface FormData {
    searchByType: number;
    searchByValue: string;
    fromtDate: string | null;
    totDate: string | null;
  }

  interface Options {
    value: string;
    viewValue: string;
  }

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class CustomersComponent implements OnInit {
  sort: any;
  paginator: any;


  // DaterangePicker ngAfterViewInit

  
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    $('.mat-tab-header').css("width", "92%");
  
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

  onDateRangeSelected(fromtDate: string, totDate: string) {
    this.formData.fromtDate = new Date(fromtDate).toISOString();
    this.formData.totDate = new Date(totDate).toISOString();
    this.SearchCustomers();
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
    this.SearchCustomers();
}

  columnsToDisplay: string[] = ['expand','categoryId', 'customerName', 'contactNo_1', 'ethnicity', 'address', 'action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  expandedElement!: PeriodicElement | null;
  panelOpenState = false;
  submitted = false;
  
  Options: Options[] = [
    {value: 'Customer Name', viewValue: 'Customer Name'},
    {value: 'Customer Number', viewValue: 'Customer Number'},
    {value: 'Customer ID', viewValue: 'Customer ID'},
    {value: 'Address', viewValue: 'Address'},
    {value: 'Category', viewValue: 'Category'},
    {value: 'Ethinicity', viewValue: 'Ethinicity'},

  ];

  customerData:any[]=[];
  tempCustomerData:any[]=[]
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  tempCustomerId:number = 0
  formData: FormData = {
    searchByType: 1,
    searchByValue: '',
    fromtDate: null,
    totDate: null
  };

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex; 
    this.tempCustomerData=this.tempCustomerData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.tempCustomerData);  
  }

  constructor(public dialog: MatDialog , public roleBaseAccess:RoleBaseControlService,private api:CustomersService, private router:Router,private toastr: ToastrService,private constants: Constants)
   {
    this.SearchCustomers();
  
    }
  ngOnInit(): void {
   
    this.dataSource.paginator = this.paginator;
  }
  
 
    
  deleteCustomerDialog(customerId:number){ 
    this.tempCustomerId = customerId;
      this.dialog.open(DeleteCustomerComponent,{
        width:'607px',height:'409px',
        data:{cid:customerId} 
      })
      .afterClosed().subscribe((res)=>{ 
       if(res.status === true){ 
        if(res.status === true){
             for(let i=0; i< this.tempCustomerData.length; i++){
              if(this.tempCustomerData[i].customerId == this.tempCustomerId){
                this.tempCustomerData.splice(i,1);
                break;
              }
             }
             this.customerData=this.tempCustomerData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
              this.tempCustomerId = 0;
              this.toastr.success(this.constants.SuccessMessages.CUSTOMER_DELETED_MESSAGE);
             this.SearchCustomers();
             
            }
        }
      })
    
    
  
  }
  addCustomer() {
   
      this.router.navigate(['/add-customer']);  
  }
  viewCustomerCall(customerId:number){
 
   this.router.navigate(['/view-customer'],{queryParams:{'customerId':customerId}})
  }
  editCustomerCall(customerId:number){
  
    this.router.navigate(['/edit-customer'],{queryParams:{'customerId':customerId}})
  }  

  SearchCustomers() {
    const fromtDate = this.formData.fromtDate ? new Date(this.formData.fromtDate).toISOString() : undefined;
    const totDate = this.formData.totDate ? new Date(this.formData.totDate).toISOString() : undefined;
    this.api.SearchCustomer(this.formData.searchByType, this.formData.searchByValue, fromtDate, totDate).subscribe({
      next: (res) => {
        if (res.status) {
          this.tempCustomerData = res.data;
          this.length = this.tempCustomerData.length; 
          this.customerData = this.tempCustomerData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.customerData);
          if (this.customerData.length === 0) {
            $("mat-paginator").hide();
            $("#err_msg").show();
          } else {
            $("#err_msg").hide();
            $("mat-paginator").show();
          }
        }
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_USER_DATA_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_USER_DATA)
            
          } else if (error.error.error.code === this.constants.ErrorCodes.USER_ID_DOES_NOT_EXISTS){
            this.toastr.error(this.constants.Messages.USER_ID_DOES_NOT_EXIST)
          }
          else if (error.error.error.code === this.constants.ErrorCodes.ROLE_EXIST_ERROR_ERROR_CODE){
            this.toastr.error(this.constants.Messages.ROLE_EXIST_MESSAGE)
          }
          else if (error.error.error.code === this.constants.ErrorCodes.NO_USER_FOUND_CODE){
            this.toastr.error(this.constants.Messages.NO_USER_FOUND_MESSAGE)
          }
          else{
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_USER_DATA)
           }
         }
         else{
          this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_USER_DATA)
         }
      }     
      
    })
  }
  
  
  } 
   
