import {OnInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/api_services/user.service';
import { Constants } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';
// import { NgModel } from '@angular/forms';


export interface PeriodicElement {
  userId: number;
  name: string;
  roleName: string;
  emailId: string;
  contactNo_1:number;
  
  
}
interface FormData {
  searchByType: number;
  searchByValue: string;
  fromtDate: string | null;
  totDate: string | null;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  usersData:any[]=[];
  fromtDate: string = '';
  totDate: string = '';
    selectedDateRange: string = '';
  tempUsersData:any[]=[]
  formData: FormData = {
    searchByType: 1,
    searchByValue: '',
    fromtDate: null,
    totDate: null
  };
  
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  tempUserId:number = 0;
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
    }, (start, end) => {
      this.handleDateRangeSelection({ startDate: start, endDate: end });
    });
  }
  
  
  

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex; 
    this.usersData=this.tempUsersData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.usersData); 
  }
  
  displayedColumns: string[] = ['userId', 'name', 'roleName', 'emailId', 'contactNo_1', 'action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();

  constructor(public dialog: MatDialog,public roleBaseAccess:RoleBaseControlService,private api:UserService,private router:Router,private constants:Constants,private toastr:ToastrService) {
    this.SearchUsers();
     
   }
  
  
   ngOnInit(): void {
   
    this.dataSource.paginator = this.paginator;
  }

  

  
  deleteUserDialog(userId:number){ 
    this.tempUserId = userId;
    this.dialog.open(DeleteUserComponent,{
      width:'607px',height:'409px',
      data:{uid:userId} 
    })
    .afterClosed().subscribe((res)=>{ 
     if(res.status === true){ 
      if(res.status === true){
           for(let i=0; i< this.tempUsersData.length; i++){
            if(this.tempUsersData[i].customerId == this.tempUserId){
              this.tempUsersData.splice(i,1);
              break;
            }
           }
           this.usersData=this.tempUsersData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.tempUserId = 0;
            this.toastr.success(this.constants.SuccessMessages.USER_DELETED_MESSAGE);
           this.SearchUsers();
          }
      }
    })
  

  }
 

  addUser() { 
      this.router.navigate(['/add-user']);  
  }

  viewUsersCall(userId: number) {
   
      this.router.navigate(['/view-user'], { queryParams: { 'userId': userId } });
     
  }

  editUsersCall(userId: number) {
    
      this.router.navigate(['/edit-user'], { queryParams: { 'userId': userId } });  
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
    this.SearchUsers();
  }
  

  
  SearchUsers() {
    const fromtDate = this.formData.fromtDate ? new Date(this.formData.fromtDate).toISOString() : undefined;
    const totDate = this.formData.totDate ? new Date(this.formData.totDate).toISOString() : undefined;
    this.api.searchUsers(this.formData.searchByType, this.formData.searchByValue, fromtDate, totDate).subscribe({
      next: (res) => {
        if (res.status) {
          this.tempUsersData = res.data;
          this.length = this.tempUsersData.length; 
          this.usersData = this.tempUsersData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.usersData);
          if (this.usersData.length === 0) {
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