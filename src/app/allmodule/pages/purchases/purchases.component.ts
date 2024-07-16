import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//date range library

import * as moment from 'moment';
import * as $ from "jquery";
import 'daterangepicker';
import { PageEvent } from '@angular/material/paginator';
import { DeletePurchaseOrderComponent } from './delete-purchase-order/delete-purchase-order.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchasesService } from '../../services/api_services/purchases.service';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';
export interface PeriodicElement {
  poId:number,
  PN: number;
  DateandTime: string;
  SupplierName: string;
  Status: string;
  AddedBy: string;
}

export interface PeriodicElement1 {
  DateandTime: string;
  SupplierName: string;
  PaymentDue: number;
  TotalBill: number;
  DifferencePercent: number;
}

export interface PeriodicElement2 {
  DateandTime: string;
  SupplierName: string;
  Amount: number;
  Payment_Due: string;
  AddedBy: string;
}

interface Options {
  value: number;
  viewValue: string;
}
interface Second {
  value: string;
  viewValue: string;
}
interface Second2 {
  value: string;
  viewValue: string;
}


const ELEMENT_DATA: PeriodicElement[] = [];
// { PN: 123, DateandTime: '12-06-2022, 12.00pm', SupplierName: 'Amit Singh', poStatus: 'Not Received', AddedBy: 'Lorem ipsum dolor sit amet,' },

const ELEMENT_DATA1: PeriodicElement1[] = [
  { DateandTime: '1-1-2023', SupplierName: 'XYZ', PaymentDue: 5000, TotalBill: 3000, DifferencePercent: 50 },
  { DateandTime: '1-1-2023', SupplierName: 'XYZ', PaymentDue: 2000, TotalBill: 3000, DifferencePercent: 36 },
  { DateandTime: '1-1-2023', SupplierName: 'XYZ', PaymentDue: 0, TotalBill: 0, DifferencePercent: 50 },
  { DateandTime: '1-1-2023', SupplierName: 'XYZ', PaymentDue: 5000, TotalBill: 9000, DifferencePercent: 24 },
  { DateandTime: '1-1-2023', SupplierName: 'XYZ', PaymentDue: 3000, TotalBill: 10000, DifferencePercent: 50 },

];


const ELEMENT_DATA2: PeriodicElement2[] = [
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Amit Singh',Amount:1500.00,Payment_Due:'5000.00', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Barjesh Kumar',Amount:1500.00,Payment_Due:'paid', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Chandana C',Amount:1500.00,Payment_Due:'paid', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Dharini Nair',Amount:1500.00,Payment_Due:'5000.00', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Emmanuel Roy',Amount:1500.00,Payment_Due:'paid', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Fakrudin Shek',Amount:1500.00,Payment_Due:'paid', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Gaytri Ram',Amount:1500.00,Payment_Due:'5000.00', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Hima Rathore',Amount:1500.00,Payment_Due:'5000.00', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'Ishitha Roy Kapoor',Amount:1500.00,Payment_Due:'paid', AddedBy:'Komal' },
  { DateandTime: '12/06/2022, 12pm', SupplierName :'ABCDEFGHIJKLMNOPQRSTUVWXYZ',Amount:1500.00,Payment_Due:'paid', AddedBy:'Komal' },
];

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  [x: string]: any;

  formData = {
    "searchByType": 1,

  "searchByValue": "",
  "fromtDate": undefined as any,
  "totDate": undefined as any
  };

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
    },  (start, end, _label) => {
      // console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
     this.formData.fromtDate = start.format('YYYY-MM-DD')
     this.formData.totDate  = end.format('YYYY-MM-DD')
    });
  }

  // Date Range Picker  end ts
  displayedColumns: string[] = ['PN', 'DateandTime', 'SupplierName', 'Status', 'AddedBy', 'action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();

  displayedColumns1: string[] = ['DateandTime', 'SupplierName', 'PaymentDue', 'TotalBill', 'DifferencePercent', 'action'];
  dataSource1 = ELEMENT_DATA1;

  displayedColumns2: string[] = ['DateandTime', 'SupplierName', 'Amount', 'Payment_Due', 'AddedBy', 'action'];
  dataSource2 = ELEMENT_DATA2;

  Options: Options[] = [
    { value: 1, viewValue: 'Supplier Name' },
    { value: 2, viewValue: 'PN' },
  ];

  Second: Second[] = [
    { value: 'Supplier Name', viewValue: 'Supplier Name' },
    { value: 'PaymentDue', viewValue: 'PaymentDue' },
  ];

  Second2: Second2[] = [
    { value: 'Supplier Name', viewValue: 'Supplier Name' },
    { value: 'PaymentDue', viewValue: 'PaymentDue' },
  ];


  AllPurchaseOrder: PeriodicElement[] = [];
  tempPurchaseOrder:any[]=[];
  AllCategory:any[]=[];
  mainData:any[]=[];
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  temppurchaseOrderID : any


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log(e);
    this.AllCategory=this.mainData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
  }

  


  constructor(public dialog: MatDialog , 
              private router: Router,
              private purchaseService : PurchasesService, 
              private toastr: ToastrService,
              public roleBaseAccess:RoleBaseControlService,) 
              {
                this.loadPurchases();
              

               }

  ngOnInit(): void {

  

    this.formData.fromtDate = moment().format('YYYY-MM-DD');
    this.formData.totDate  = moment().format('YYYY-MM-DD');


   

  }
  //payment due button colour start ts
  changeButtonColor(receivedNotReceivedValidator: string, status: string) {
    const button = document.getElementById(receivedNotReceivedValidator) as HTMLButtonElement;
    
    if (status.trim() === 'Received') {
      button.style.backgroundColor = '#75DA72'; // Green for 'Received'
    } else if (status.trim() === 'Not Received') {
      button.style.backgroundColor = '#ED1C24'; // Red for 'Not Received'
    }
  }
  
  // Updated getButtonStyle function to manage background colors
  
  getButtonStyle(status: string): { 'background-color': string } {
    if (status && status.trim() === 'Received') {
      return { 'background-color': '#75DA72' }; // Green
    } else if (status && status.trim() === 'Not Received') {
      return { 'background-color': '#ED1C24' }; // Red
    } else {
      return { 'background-color': 'initial' }; // Default background color
    }
  }
  
  //payment due button colour end  ts

  deletePurchaseOrderDialog(element: any): void {
      this.temppurchaseOrderID = element.poId;

    let dialogRef = this.dialog.open(DeletePurchaseOrderComponent, {
      width: '604px',
        height: '391px',
        data: element,
    }).afterClosed()
    .subscribe((res) => {

      // console.log('AllPurchase length ' + this.AllPurchaseOrder.length);
      // console.log(this.temppurchaseOrderID);

    if (res === true) {
          for (let i = 0; i < this.AllPurchaseOrder.length; i++) {
            if (this.AllPurchaseOrder[i].poId == this.temppurchaseOrderID) {
              this.AllPurchaseOrder.splice(i, 1);
              break;
            }
          }
          this.AllPurchaseOrder = this.AllPurchaseOrder.slice(
            this.pageSize * this.pageIndex,
            this.pageSize * this.pageIndex + this.pageSize
          );
          this.temppurchaseOrderID = 0;
          this.length = this.AllPurchaseOrder.length;

          this.loadPurchases();
        }
      });

  }

 

  loadPurchases() {
 
     const data = {

      "searchByType": this.formData.searchByType,
      "searchByValue": this.formData.searchByValue,
      "fromtDate": this.formData.fromtDate,
      "totDate": this.formData.totDate
    }

    // console.log(data);
  
      this.purchaseService
      .getAllPurchaseOrders(data)
      .subscribe({
        next: (res) => {
          if (res.data.length == 0) {
            this['AllPurchaseOrders'] = res.data;
            $('mat-paginator').hide();
            $("#err_msg").show();
            this. length = res.data.length;
            this.tempPurchaseOrder= res.data;
            this.AllPurchaseOrder=this.tempPurchaseOrder.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.dataSource = new MatTableDataSource<PeriodicElement>(this.AllPurchaseOrder);



            return res.status
          } else {
            $("#err_msg").hide();
            $('mat-paginator').show();
            this.length = res.data.length;
            this.tempPurchaseOrder = res.data;
            
            this.AllPurchaseOrder = this.tempPurchaseOrder.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.dataSource = new MatTableDataSource<PeriodicElement>(this.AllPurchaseOrder); //pass the array you want in the table
            
            
            
            return res.status;
          }
        },
        error: (error) => {
         
          this.toastr.error('something went wrong');
        },
      });
  
   
  }

addPurchaseOrder(){
 
    this.router.navigate(['/add-purchase-order']);  
}

  onViewPurchaseOrder(element: any) {
   
    this.router.navigate(['view-purchase-order'],
    { 
      queryParams: { id: element['poId'] }
    });
  }

  onEditPurchaseOrder(element: any) {
   
   this.router.navigate(['edit-purchase-order'],
    { 
      queryParams: { id: element['poId'] }
    });
  }
}











