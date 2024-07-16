import { Component, OnInit } from '@angular/core';
//date range library 
import * as moment from 'moment';
import * as $ from "jquery";
import 'daterangepicker';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePurchasesComponent } from './delete-purchases/delete-purchases.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiService } from 'src/app/allmodule/services/api_services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';
import { PeriodicElement } from '../purchases.component';
import { PurchaseDataService } from 'src/app/allmodule/services/data_services/purchase-data.service';
import { RoleBaseControlService } from 'src/app/allmodule/services/data_services/role-base-control.service';

export interface PeriodicElement1 {
  DateandTime: string;
  SupplierName: string;
  payment_due: string;
  TotalBill: number;
  DifferencePercent: number;
  purchaseId: number,
  invoiceNumber: string,
  createdAt: string,
  createdBy: number
  }

interface Second {
   value:string;
   viewValue:string;
}

const ELEMENT_DATA: PeriodicElement1[] = [
  // { DateandTime: '12/06/2022, 12pm', SupplierName :'Amit Singh',payment_due:'5000.00', TotalBill:1500.00, DifferencePercent: 50 },
  // { DateandTime: '12/06/2022, 12pm', SupplierName :'Barjesh Kumar',payment_due:'Paid', TotalBill:1500.00, DifferencePercent: 36 },
  // { DateandTime: '12/06/2022, 12pm', SupplierName :'Chandana C',payment_due:'Paid', TotalBill:1500.00, DifferencePercent: 50 },
  
];

@Component({
  selector: 'app-add-purchases-tab',
  templateUrl: './add-purchases-tab.component.html',
  styleUrls: ['./add-purchases-tab.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})
export class AddPurchasesTabComponent implements OnInit {
//date range start ts
row: any;
sort:any;
paginator:any;
  tempPurchase :any
  AllPurchase :any
  tempPurchaseId: any;


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
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
  }

// Date Range Picker  end ts

  Second: Second[]=[
    {value: 'Supplier Name', viewValue: 'Supplier Name'},
    {value: 'PaymentDue', viewValue: 'PaymentDue'},
  ];
  formData = {
    searchByType: 1,
    searchByValue: '',
    "fromtDate": undefined as any,
  "totDate": undefined as any
  };

  displayedColumns1: string[]=['expand','DateandTime', 'SupplierName', 'payment_due', 'TotalBill', 'DifferencePercent','action'];
  dataSource1 = new MatTableDataSource < PeriodicElement1 > ();
  panelOpenState = false;
  expandedElement1!: PeriodicElement1 | null ;
  submitted = false;

  AllCategory:any[]=[];
  mainData:any[]=[];
  length = 100;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
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
    this.AllPurchase=this.mainData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.dataSource1 = new MatTableDataSource < PeriodicElement1 > (this.AllPurchase);

  }
  constructor(private api:ApiService,public dialog: MatDialog,
              private router: Router,
              private purchaseService : PurchasesService, 
              public roleBaseAccess:RoleBaseControlService,
              private toastr: ToastrService, private dataService:PurchaseDataService) 
              {
               
               }

  ngOnInit(): void {

    
    this.formData.fromtDate = moment().format('YYYY-MM-DD');
    this.formData.totDate  = moment().format('YYYY-MM-DD');

    this.loadPurchase();
    this.dataSource1.paginator = this.paginator

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

  getButtonStyle(content: string): any {
    const numberRegex = /^\d+(\.\d+)?$/;
    const greenStyle = {
      'background-color': '#75DA72',
      'width': '54.5px',
      'height': '36.5px'
    };
    const redStyle = {
      'background-color': '#ED1C24',
      'width': '83.5px',
      'height': '36.5px'
    };

    if (numberRegex.test(content)) {
      return redStyle; // Red for numbers and decimals
    } else {
      return greenStyle; // Green for strings
    }
  }
  //payment due button colour end  ts
  deletePurchasesDialog(element: any): void {
    
      this.tempPurchaseId = element.purchaseId;
      console.log(typeof this.tempPurchaseId);
  
      let dialogRef = this.dialog.open(DeletePurchasesComponent, {
        width:'604px',height:'391px', data:this.tempPurchaseId,
      })
      .afterClosed()
      .subscribe((res) => {
        console.log('AllPurchase length ' + this.AllPurchase.length);
        console.log(this.tempPurchaseId);
  
        if (res === true) {
          for (let i = 0; i < this.AllPurchase.length; i++) {
            if (this.AllPurchase[i].productId == this.tempPurchaseId) {
              this.AllPurchase.splice(i, 1);
              break;
            }
          }
          this.AllPurchase = this.AllPurchase.slice(
            this.pageSize * this.pageIndex,
            this.pageSize * this.pageIndex + this.pageSize
          );
          this.tempPurchaseId = 0;
          this.length = this.AllPurchase.length;
          // alert("Product deleted successfully");
          //this.toastr.success("Product deleted successfully");
  
          this.loadPurchase();
        } 
      });
    
    


  }

  loadPurchase() {
    //console.log(this.formData.searchByValue);


    const data = {

      "searchByType": this.formData.searchByType,
      "searchByValue": this.formData.searchByValue,
      "fromtDate": this.formData.fromtDate,
      "totDate": this.formData.totDate
    }
    

    this.purchaseService
      .getAllPurchase(data)
      .subscribe({
        next: (res) => {
          if (res.data.length == 0) {
            
            $('mat-paginator').hide();
            $("#err_msg").show();

            this.length = res.data.length;
            this.tempPurchase = res.data;
            
            this.AllPurchase = this.tempPurchase.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.dataSource1 = new MatTableDataSource<PeriodicElement1>(this.AllPurchase); //pass the array you want in the table
            console.log(this.dataSource1);
             //pass the array you want in the table
             
            return res.status
          } else {
            $("#err_msg").hide();
            $('mat-paginator').show();
            this.length = res.data.length;
            this.tempPurchase = res.data;
            
            

            const mappedData: PeriodicElement1[] = this.tempPurchase.map((item: { purchaseDate: any; suppliername: any; totalBill: any; purchaseId: any; invoiceNumber: any; createdAt: any; createdBy: any;totalPaid:any; }) => ({
              DateandTime: item.purchaseDate, // Assuming purchaseDate is the DateandTime
              SupplierName: item.suppliername,
             
              TotalBill: item.totalBill,
              
              purchaseId: item.purchaseId,
              invoiceNumber: item.invoiceNumber,
              createdAt: item.createdAt,
              createdBy: item.createdBy,
              payment_due: item.totalBill - item.totalPaid === 0 ? "Paid" : (item.totalBill - item.totalPaid), 
              // If totalBill equals totalPaid, set payment_due to "Paid", otherwise calculate the due amount
              DifferencePercent: 0, // You need to specify where this value comes from
            }));
            
            //console.log(mappedData);

            this.mainData = mappedData

            this.AllPurchase = this.mainData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            
            this.dataSource1 = new MatTableDataSource<PeriodicElement1>(this.AllPurchase); //pass the array you want in the table
            
            
            return res.status;
          }
        },
        error: (error) => {
          //alert("something went wrong");
          this.toastr.error('something went wrong');
        },
      });

    // console.log('AllProducts:' + this.AllProducts);
  }

  addNewPurchase(){
   
    this.dataService.setPurchasePaymentDetails('');
    this.dataService.setPurchaseProductDetails('');
    this.router.navigate(['/add-purchase-product-details'])
  }

  viewPurchase(element:any){
   
    this.dataService.setPurchasePaymentDetails('');
    this.dataService.setPurchaseProductDetails('');
    this.router.navigate(['view-purchases-product-details'], {
      queryParams: { id: element['purchaseId'] },
    });

  }

  editPurchase(purchaseId:any){
    
    this.dataService.setPurchasePaymentDetails('');
    this.dataService.setPurchaseProductDetails('');
    this.router.navigate(['/edit-purchases-product-details'], { queryParams: { 'purchaseId': purchaseId } });

  }

}
