import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { ViewExpensesCategoryComponent } from './expenses-category/view-expenses-category/view-expenses-category.component';
import { EditExpensesCategoryComponent } from './expenses-category/edit-expenses-category/edit-expenses-category.component';
import { DeleteExpensesCategoryComponent } from './expenses-category/delete-expenses-category/delete-expenses-category.component';
import { AddExpensesCategoryComponent } from './expenses-category/add-expenses-category/add-expenses-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { DeleteExpensesComponent } from './delete-expenses/delete-expenses.component';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { ExpensesService } from '../../services/api_services/expenses.service';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';

export interface PeriodicElement {
  expenseDate: string;
  expenseCategoryId: string;
  amount: number;
  expenseNote: string;
  createdBy: string;
  Action: string;
}
interface Options {
  value: string;
  viewValue: string;
}
// export interface PeriodicElement1 {
//   Product_Name: string;
//   Unit_Price: number;
//   Current_Stock: number;
//   Current_Stock_Value: number;
//   Units_Sold: number;
//   Action: string;
// }

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpensesComponent implements OnInit {
  sort: any;
  paginator: any;
  
  ngAfterViewInit() {

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
    }, function (start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  }
  searchColumns: string[] = ['expenseCategoryId','createdBy'];
  displayedColumns: string[] = ['expenseDate', 'expenseCategoryId', 'amount', 'expenseNote','Added_by', 'Action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  expandedElement!: PeriodicElement | null;
  panelOpenState = false;
  submitted = false;

  Options: Options[] = [
    {value: 'expenseDate', viewValue: 'expenseDate'},
    {value: 'expenseCategoryId', viewValue: 'expenseCategoryId'},
    {value: 'amount', viewValue: 'amount'},
    {value: 'expenseNote', viewValue: 'expenseNote'},
    {value: 'Action', viewValue: 'Action'},
    //{value: 'Ethinicity', viewValue: 'Ethinicity'},

  ];
  expenseData:any[]=[];
  tempExpenseData:any[]=[]
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];

  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  tempExpenseId:number = 0
  formData = {
    searchByType: 1,
    searchByValue : '',
  }
  

 
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex; 
    this.expenseData=this.tempExpenseData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.expenseData);
    
  }

  constructor(public dialog: MatDialog, public roleBaseAccess:RoleBaseControlService, private api:ExpensesService, private router:Router,private toastr: ToastrService,private constants: Constants) 
  {
    this.SearchExpenses();
    
   }

  ngOnInit(): void {
   
    this.dataSource.paginator = this.paginator
  }


  deleteExpenseDialog(expenseId:number){ 
    
    this.tempExpenseId = expenseId;
    this.dialog.open(DeleteExpensesComponent,{
      width:'607px',height:'409px',
      data:{cid:expenseId} 
    })
    .afterClosed().subscribe((res)=>{ 
     if(res.status === true){ 
      if(res.status === true){
           for(let i=0; i< this.tempExpenseData.length; i++){
            if(this.tempExpenseData[i].expenseId == this.tempExpenseId){
              this.tempExpenseData.splice(i,1);
              break;
            }
           }
           this.expenseData=this.tempExpenseData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.tempExpenseId = 0;
            this.toastr.success(this.constants.SuccessMessages.EXPENSES_DELETED_MESSAGE);
           this.SearchExpenses();
           
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

  addExpenses(){
      this.router.navigate(['/add-expenses']) 
  }

  viewExpensesCall(expenseId:number){
    this.router.navigate(['/view-expenses'],{queryParams:{'expenseId':expenseId}})
   }
   editExpensesCall(expenseId:number){
   
    this.router.navigate(['/edit-expenses'],{queryParams:{'expenseId':expenseId}})
  } 
  SearchExpenses(){
    this.api.SearchExpense(this.formData.searchByType,this.formData.searchByValue).subscribe({
      next:(res)=>{
        if(res.data.length==0){
          this.expenseData=res.data;
          $(".mat-paginator").hide();
          // $(".content-table").hide();
          $("#err_msg").show();
          this. length = res.data.length;
          this.tempExpenseData= res.data;
          this.expenseData=this.tempExpenseData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
          this.dataSource = new MatTableDataSource < PeriodicElement > (this.expenseData);
           //pass the array you want in the table
          return res.status
        }
        else{  
          $("#err_msg").hide();
          $("mat-paginator").show();
          this. length = res.data.length;
          this.tempExpenseData= res.data;
          this.expenseData=this.tempExpenseData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
          this.dataSource = new MatTableDataSource < PeriodicElement > (this.expenseData);
          return res.status
        }
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes. FAILED_TO_FETCH_EXPENSE_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_EXPENSE_DATA_MESSAGE)
            
          } else if (error.error.error.code === this.constants.ErrorCodes.EXPENSEC_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toastr.error(this.constants.Messages.EXPENSE_ID_DOES_NOT_EXISTS )
          }
          else if (error.error.error.code === this.constants.ErrorCodes.EXPENSE_EXIST_ERROR_CODE){
            this.toastr.error(this.constants.Messages. EXPENSE_EXIST_MESSAGE )
          }else{
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_EXPENSE_DATA_MESSAGE)
           }
         }
         else{
          this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_EXPENSE_DATA_MESSAGE)
         }
      }      
     })
  }

}
