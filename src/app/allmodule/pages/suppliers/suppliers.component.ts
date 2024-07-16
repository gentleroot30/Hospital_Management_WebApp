
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NgForm } from '@angular/forms';

import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { DeleteSupplierComponent } from './delete-supplier/delete-supplier.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { SupplierService } from '../../services/api_services/supplier.service';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';


export interface PeriodicElement {
  supplierName: string;
  address: string;
  contactNo1:string;
  purchaseDue:number;
  purchaseReturns:number;

  
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
const ELEMENT_DATA: PeriodicElement[] = [
  // {userName: 'Amit Singh', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'Barjesh Kumar', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'Chandana C', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'Dharini Nair', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'Emmanuel Roy', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'Gaytri', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'Hima rathore', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'Ishitha Roy Kapoor', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'abcdefghijkllmnopqrstuvwxyz', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'},
  // {userName: 'Fakrudin Shek', contact: '+91-5656565656', purchasedue: '5000.00' , purchasereturndue: '5000.00'}

];
@Component({
  selector: 'app-suppliers',
  templateUrl:'./suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SuppliersComponent implements OnInit {
  sort:any;
  paginator:any;

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
  // handleDateRangeSelection(event: any) {
  //   const selectedDateRange = event;
  //   if (selectedDateRange) {
  //     this.formData.fromtDate = selectedDateRange.startDate ? selectedDateRange.startDate.toISOString() : null;
  //     this.formData.totDate = selectedDateRange.endDate ? selectedDateRange.endDate.toISOString() : null;
  //   } else {
  //     this.formData.fromtDate = null;
  //     this.formData.totDate = null;
  //   }
  //   this.searchSupplier();
  // }

  columnsToDisplay: string[] = ['expand','supplierName', 'contactNo1', 'purchaseDue', 'purchaseReturns', 'action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  expandedElement!: PeriodicElement | null;
  panelOpenState = false;
  // addSupplierForm!: FormGroup;
  submitted = false;
  showTableHeader = false;
  Options: Options[] = [
    {value: 'supplierName', viewValue: 'supplierName'},
    {value: 'address', viewValue: 'address'},
    {value: 'contactNo1', viewValue: 'contactNo1'},
    {value: 'purchaseDue', viewValue: 'purchaseDue'},
    {value: 'purchaseReturns', viewValue: 'purchaseReturns'},
  ];
  totalPurchaseReturns = 0;
  AllSupplier:any[]=[]; 
  tempSupplierData:any[]=[];
  length = 100;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  noSuppliersFound= false;
  totalPurchaseDue = 0;

  tempsupplierId:number = 0
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
    this.tempSupplierData=this.tempSupplierData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.tempSupplierData); 
  }

  constructor(public dialog: MatDialog ,public roleBaseAccess:RoleBaseControlService, private api:SupplierService, private router:Router,private toastr: ToastrService ,private constants:Constants) 
  {
    this.searchSupplier();
  
  }
  
  ngOnInit(): void {
   
  
    this.dataSource.paginator = this.paginator;
  }
  

  onDateRangeSelected(fromtDate: string, totDate: string) {
    this.formData.fromtDate = new Date(fromtDate).toISOString();
    this.formData.totDate = new Date(totDate).toISOString();
    this.searchSupplier();
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
    this.searchSupplier();
}
  deleteSupplierDialog(supplierId:number): void{  
    this.tempsupplierId = supplierId;
      this.dialog
      .open(DeleteSupplierComponent,{
        width:'604px',
        height:'391px',
        data:{sid:supplierId}, 
      })
      .afterClosed().subscribe((res)=>{ 
       
        if(res.status === true){
            for(let i=0; i< this.tempSupplierData.length; i++){
              if(this.tempSupplierData[i].supplierId == this.tempsupplierId){
                this.tempSupplierData.splice(i,1);
                break;
              }
            }
    this.AllSupplier=this.tempSupplierData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.tempsupplierId = 0;
    this.searchSupplier();
          
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_SUPPLIER_MESSAGE);
          }
       });
  
   
  }

  calculateTotals(data: any[]) {
    this.totalPurchaseDue = data.reduce((sum, item) => sum + item.purchaseDue, 0);
    this.totalPurchaseReturns = data.reduce((sum, item) => sum + item.purchaseReturns, 0);
  }


  addSupplier(){ 
      this.router.navigate(['/add-supplier']);  
  }

  viewSupplier(supplierId:number){ 
  
    this.router.navigate(['/view-supplier'],{ queryParams:{'supplierId':supplierId} })
  }


  editSupplier(supplierId:number){
   
    this.router.navigate(['/edit-supplier'],{ queryParams: {'supplierId':supplierId}})
  }




searchSupplier() {
  const fromtDate = this.formData.fromtDate ? new Date(this.formData.fromtDate).toISOString() : undefined;
  const totDate = this.formData.totDate ? new Date(this.formData.totDate).toISOString() : undefined;

  console.log('Form Data:', this.formData);

  this.api.searchSupplier(this.formData.searchByType, this.formData.searchByValue, fromtDate, totDate).subscribe({
    next: (res) => {
      console.log('API response', res);
      if (res.status) {
        this.tempSupplierData = res.data;
        this.length = this.tempSupplierData.length; 
        this.AllSupplier = this.tempSupplierData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.AllSupplier);
        if (this.AllSupplier.length === 0) {
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