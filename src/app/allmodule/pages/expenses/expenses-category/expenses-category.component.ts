import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddExpensesCategoryComponent } from './add-expenses-category/add-expenses-category.component';
import { EditExpensesCategoryComponent } from './edit-expenses-category/edit-expenses-category.component';
import { ViewExpensesCategoryComponent } from './view-expenses-category/view-expenses-category.component';
import { DeleteExpensesCategoryComponent } from './delete-expenses-category/delete-expenses-category.component';
import { PageEvent } from '@angular/material/paginator';
import { Constants } from 'src/app/app.constants';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';

@Component({
  selector: 'app-expenses-category',
  templateUrl: './expenses-category.component.html',
  styleUrls: ['./expenses-category.component.css']
})
export class ExpensesCategoryComponent implements OnInit {
  mainData: any[] = [];
  tempMainData: any[] = [];
  length = 100;
  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [8, 10, 20, 30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  formData = {
    searchByType: 1,
    searchByValue: ''
  };

  // handlePageEvent(e: PageEvent) {
  //   this.pageEvent = e;
  //   console.log("pageEvent-",this.pageEvent);
  //   this.length = e.length;
  //   console.log("length-",this.length);
  //   this.pageSize = e.pageSize;
  //   console.log("pageSize-",this.pageSize);
  //   this.pageIndex = e.pageIndex;
  //   console.log("pageIndex-",this.pageIndex);
  //   this.mainData = this.tempMainData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
  //   console.log("mainData-",this.mainData);
  // }
  handlePageEvent(e: PageEvent) {
    console.log("Received page event:", e);
    
    // Update pagination properties
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    
    // Calculate the slice indices for the current page
    const startIndex = this.pageSize * this.pageIndex;
    const endIndex = startIndex + this.pageSize;
    
    // Ensure tempMainData is not empty
    if (this.tempMainData.length === 0) {
      console.log("TempMainData is empty, fetching data...");
      this.SearchExpensesCategories();
      return;
    }
    
    // Ensure startIndex is within bounds
    if (startIndex < 0 || startIndex >= this.tempMainData.length) {
      console.warn("Invalid startIndex:", startIndex);
      return;
    }
    
    // Ensure endIndex is within bounds
    if (endIndex < startIndex || endIndex > this.tempMainData.length) {
      console.warn("Invalid endIndex:", endIndex);
      return;
    }
    
    // Update mainData with the slice for the current page
    this.mainData = this.tempMainData.slice(startIndex, endIndex);
    console.log("Updated mainData:", this.mainData);
  }
  
  constructor(private api: ExpensesService, public dialog: MatDialog, private router: Router,private constants:Constants,private toastr:ToastrService) { }

  tempCategoryId: number = 0;
  ngOnInit(): void {
    this.SearchExpensesCategories();
  }

  categoryOpenDialog() {
    this.dialog.open(AddExpensesCategoryComponent, {
      width: '700px', height: '450px',
    })
      .afterClosed().subscribe(() => {
        this.SearchExpensesCategories();
      })

  }
  editCategoryDialog(categoryId: number) {
    this.tempCategoryId = categoryId;
    this.dialog.open(EditExpensesCategoryComponent, {
      width: '700px', height: '450px',
      data: categoryId,
    })
      .afterClosed().subscribe((res) => {

        if (res.status === true) {

          this.api.getExpensesCategoryById(this.tempCategoryId).subscribe({
            next: (res) =>
              this.mainData.forEach(element => {
                if (element.categoryId == this.tempCategoryId) {
                  element.categoryName = res.data.categoryName;
                  element.description = res.data.description;
                  this.tempCategoryId = 0;
                  this.toastr.success(this.constants.SuccessMessages.EXPENSE_CATEGORY_UPDATED_MESSAGE);
                  return;
                }
              })
          })
        }
      })
  }

  viewCategoryDialog(row: any) {
    this.dialog.open(ViewExpensesCategoryComponent, {
      width: '700px', height: '450px',
      data: row,
    });
  }

  deleteCategoryDialog(categoryId: number) {

    this.tempCategoryId = categoryId;
    this.dialog.open(DeleteExpensesCategoryComponent, {
      width: '607px', height: '409px',
      data: { cci: categoryId }
    })
      .afterClosed().subscribe((res) => {
        if(res.status === true){ 
        if (res.status === true) {
          
          for (let i = 0; i < this.tempMainData.length; i++) {
            if (this.tempMainData[i].categoryId == this.tempCategoryId) {
              this.tempMainData.splice(i, 1);
              break;
            }
          }
          this.mainData = this.tempMainData.slice(this.pageSize*this.pageIndex, this.pageSize*this.pageIndex + this.pageSize);
          this.tempCategoryId = 0;
          this.toastr.success(this.constants.SuccessMessages.EXPENSE_CATEGORY_DELETED_MESSAGE);
          this.length = this.tempMainData.length;
          location.reload();
        }
      }
      })
  }
  SearchExpensesCategories() {

    this.api.searchExpensesCategory(this.formData.searchByType, this.formData.searchByValue,).subscribe({
      next: (res) => {

        if (res.data.length == 0) {
          this.mainData = res.data;
          $("mat-paginator").hide();
          $("#err_msg").show();
        }

        else {
          $("#err_msg").hide();
          $("mat-paginator").show();
          this.length = res.data.length;
          this.mainData = res.data;
          this.mainData = this.mainData.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
        }
      },
      error: (error) => {
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_EXPENSE_CATEGORY_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_EXPENSE_CATEGORY_DATA_MESSAGE)
            
          } else if (error.error.error.code === this.constants.ErrorCodes.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toastr.error(this.constants.Messages.EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS)
          }
          
         }
         else{
          this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_EXPENSE_CATEGORY_DATA_MESSAGE)
         }
      }     
      
    })
  }

}



