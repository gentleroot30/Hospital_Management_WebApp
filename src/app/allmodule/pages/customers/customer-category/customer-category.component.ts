import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCustomerCategoryComponent } from './add-customer-category/add-customer-category.component';
import { PageEvent } from '@angular/material/paginator';
import { Constants } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { EditCustomerCategoryComponent } from './edit-customer-category/edit-customer-category.component';
import { ViewCustomerCategoryComponent } from './view-customer-category/view-customer-category.component';
import { DeleteCustomerCategoryComponent } from './delete-customer-category/delete-customer-category.component';


@Component({
  selector: 'app-customer-category',
  templateUrl: './customer-category.component.html',
  styleUrls: ['./customer-category.component.css']
})
export class CustomerCategoryComponent implements OnInit {
  mainData:any[]=[];
  tempMainData:any[]=[];
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
    this.mainData=this.tempMainData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
  }

 
  constructor(private api:CustomersService,public dialog: MatDialog, private router : Router,private constants: Constants,private toastr: ToastrService ) { }
 
 
  tempCategoryId:number = 0;
  

  ngOnInit(): void {
  
    this.SearchCustomerCategories();
   
  }

 

  categoryOpenDialog() {
    this.dialog.open(AddCustomerCategoryComponent,{
      width:'650px',height:'450px',
    })
    .afterClosed().subscribe(()=>{
    this.SearchCustomerCategories();
    })
  }
  editCategoryDialog(categoryId:number) {
    this.tempCategoryId=categoryId;
    this.dialog.open(EditCustomerCategoryComponent,{
      width:'650px',height:'450px',
      data:categoryId,
     })
    .afterClosed().subscribe((res)=>{
     
      if (res.status===true){
        this.api.getCustomerCategoryById(this.tempCategoryId).subscribe({     
          next:(res)=> 
          this.mainData.forEach(element => {
            if (element.categoryId==this.tempCategoryId){
             element.categoryName = res.data.categoryName;
             element.description = res.data.description;
             this.tempCategoryId = 0;
             this.toastr.success(this.constants.SuccessMessages.CUSTOMER_CATEGORY_UPDATED_MESSAGE);
             return;
            }
           })        
        })  
      }
    })
  } 
  viewCategoryDialog(categoryId:number) {
    this.dialog.open(ViewCustomerCategoryComponent,{
      width:'650px',height:'450px',
      data:categoryId
    });
  }

  deleteCategoryDialog(customerCategoryId:number){
   
    this.tempCategoryId = customerCategoryId;
    this.dialog.open(DeleteCustomerCategoryComponent,{
      width:'607px',height:'409px',
      data:{cci:customerCategoryId} 
    })
    .afterClosed().subscribe((res)=>{  
     if(res.status === true){ 
      if(res.status === true){
           for(let i=0; i< this.tempMainData.length; i++){
            if(this.tempMainData[i].categoryId == this.tempCategoryId){
              this.tempMainData.splice(i,1);
              break;
            }
           }
           this.mainData=this.tempMainData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
            this.tempCategoryId = 0;
            this.toastr.success(this.constants.SuccessMessages.CUSTOMER_CATEGORY_DELETED_MESSAGE);
            this.length= this.tempMainData.length;
        
            
          }
      }
    })
  
  }
 
  
  SearchCustomerCategories() {
    
    this.api.searchCustomerCategory(this.formData.searchByType,this.formData.searchByValue,).subscribe({
      next:(res)=>{
        
       
        if(res.data.length==0){
          this.mainData=res.data;
          $("mat-paginator").hide();
          $("#err_msg").show();
        }

        else{
          $("#err_msg").hide();
          $("mat-paginator").show(); 
          this.length = res.data.length;
          this.tempMainData= res.data;
          this.mainData=this.tempMainData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
        }
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_CUSTOMER_CATEGORY_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_CATEGORY_DATA_MESSAGE)
            
          } else if (error.error.error.code === this.constants.ErrorCodes.CUSTOMER_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toastr.error(this.constants.Messages.CUSTOMER_CATEGORY_ID_DOES_NOT_EXISTS)
          }
          else if (error.error.error.code === this.constants.ErrorCodes.NO_CUSTOMER_CATEGORY_FOUND_ERROR_CODE){
            this.toastr.error(this.constants.Messages.NO_CUSTOMER_CATEGORY_FOUND_MESSAGE)
          }
         }
         else{
          this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_CATEGORY_DATA_MESSAGE)
         }
      }     
      
     })
  } 
}


