import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { AddRoleComponent } from '../add-role/add-role.component';
import { ViewRoleComponent } from '../view-role/view-role.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { DeleteRoleComponent } from '../delete-role/delete-role.component';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';
import { Constants } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users-role',
  templateUrl: './users-role.component.html',
  styleUrls: ['./users-role.component.css']
})
export class UsersRoleComponent implements OnInit {

  constructor(private api:UserService,public dialog:MatDialog,private router:Router,private constants:Constants,private toastr:ToastrService) {   }
  roleData:any[]=[];
  tempRoleData:any[]=[];
  tempRoleId: number = 0
  length = 100;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  formData = {
    searchByType: 1,
    searchByValue: '' 
  };

  

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.roleData=this.tempRoleData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
  }


  ngOnInit(): void {
    this.SearchUserRoles()
  }
  AddroleOpenDialog() {
    this.dialog.open(AddRoleComponent,{
      width:'650px',height:'622px',
    }) .afterClosed().subscribe(()=>{
      this.SearchUserRoles();
      });
  }
  viewRoleDialog(roleId:number) {
    this.dialog.open(ViewRoleComponent,{
      width:'607px',height:'622px',
      data:roleId
    });
  }

  EditRoleDialog(roleId:number) {
    
    this.tempRoleId=roleId;
    this.dialog.open(EditRoleComponent,{
      width:'650px',height:'622px',
      data:roleId,
    }).afterClosed().subscribe((res)=>{
     
      if (res.status===true){
        this.api.GetRoleById(this.tempRoleId).subscribe({     
          next:(res)=> 
          this.roleData.forEach(element => {
            if (element.roleId==this.tempRoleId){
             element.categoryName = res.data.categoryName;
             element.description = res.data.description;
             this.tempRoleId = 0;
             this.toastr.success(this.constants.SuccessMessages.ROLE_UPDATED_MESSAGE);
             this.SearchUserRoles()
             return;
            }
           })        
        })  
      }
    })
    
  } 



  DeleteRoleDialog(roleId:number){
    this.tempRoleId = roleId;
    this.dialog.open(DeleteRoleComponent,{
      width:'607px',height:'409px',
      data:{uid:roleId} 
    })
    .afterClosed().subscribe((res)=>{ 
     
     if(res.status === true){ 
      if(res.status === true){
           for(let i=0; i< this.tempRoleData.length; i++){
            if(this.tempRoleData[i].roleId == this.tempRoleId){
              this.tempRoleData.splice(i,1);
              break;
            }
           }
           this.roleData=this.tempRoleData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.tempRoleId = 0;
            this.toastr.success(this.constants.SuccessMessages.ROLE_DELETED_MESSAGE);
            this.length= this.tempRoleData.length;
          }
      }
    })
  
  }


  SearchUserRoles() {
    this.api.SearchUserRoles(this.formData.searchByType,this.formData.searchByValue,).subscribe({
      next:(res)=>{
       
        if(res.data.length==0){
          this.roleData=res.data;
          $("mat-paginator").hide();
          $("#err_msg").show();
        }

        else{
          $("#err_msg").hide();
          $("mat-paginator").show(); 
          this.length = res.data.length;
          this.tempRoleData= res.data;
          this.roleData=this.tempRoleData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
        }
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_ROLE_DATA_ERROR_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_ROLES_DATA_MESSAGE)
            
          } else if (error.error.error.code === this.constants.ErrorCodes.ROLE_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toastr.error(this.constants.Messages.ROLE_ID_DOES_NOT_EXISTS_MESSAGE)
          }
          else if (error.error.error.code === this.constants.ErrorCodes.NO_ROLE_FOUND_ERROR_CODE){
            this.toastr.error(this.constants.Messages.NO_ROLE_FOUND_MESSAGE)
          }
         }
         else{
          this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_ROLES_DATA_MESSAGE)
         }
      
      }
     })
  } 
}
