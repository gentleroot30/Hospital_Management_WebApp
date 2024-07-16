import { Component, OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { DeleteProductCategoryComponent } from './delete-product-category/delete-product-category.component';
import { EditProductCategoryComponent } from './edit-product-category/edit-product-category.component';
import { ViewProductCategoryComponent } from './view-product-category/view-product-category.component';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  allCategory:any[]=[];
  tempCategory:any[]=[];
  length = 100;
  pageSize = 10;
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
    this.allCategory=this.tempCategory.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
  }
  constructor(public dialog: MatDialog,private api:ProductService,private router:Router , private toastr: ToastrService,private constants:Constants) { }
  
  
  tempCategoryId:number=0;
  
  getProductCategory: any;

  ngOnInit(): void {
    this.SearchProductCategories();
   
  }


 
  categoryOpenDialog() {
  this.dialog.open(AddProductCategoryComponent,{
    width:'607px',height:'409px',
  })
  .afterClosed().subscribe((res)=>{
    this.SearchProductCategories()
  })
  }

  editCategoryDialog(productCategoryId:number) {
    
    this.tempCategoryId=productCategoryId;
    this.dialog.open(EditProductCategoryComponent,{
      width:'700px',height:'450px',
      data:productCategoryId,
     })
    .afterClosed().subscribe((res)=>{
      if (res.status===true){
       
        this.api.getProductCategoryById(this.tempCategoryId).subscribe({     
          next:(res)=>
          this.allCategory.forEach(element => {
            if (element.categoryId==this.tempCategoryId){
             element.categoryName = res.data.categoryName;
             element.description = res.data.description;
             this.tempCategoryId = 0;
             //alert("Category Updated Succesfully");
             this.toastr.success(this.constants.SuccessMessages.PRODUCT_CATEGORY_UPDATED_MESSAGE);

             return;
             
            }
           })        
        })  
      }
    })
  }

  viewCategoryDialog(row:any) {
    this.dialog.open(ViewProductCategoryComponent,{
      width:'607px',height:'409px',
      data:row,
      
    });
  }

  deleteCategoryDialog(categoryId:number){
  
    this.tempCategoryId = categoryId;
    this.dialog.open(DeleteProductCategoryComponent,{
      width:'607px',height:'409px',
      data:{pci:categoryId} 
    })
    .afterClosed().subscribe((res)=>{
        
      
          if(res === true){ 
            if(res === true) {
              for(let i=0; i< this.allCategory.length; i++){
                if(this.allCategory[i].categoryId == this.tempCategoryId){
                  this.allCategory.splice(i,1);
                  break;
                }
              } 
                this.allCategory = this.allCategory.slice(this.pageSize*this.pageIndex, this.pageSize*this.pageIndex + this.pageSize);
                this.tempCategoryId = 0;
                this.toastr.success(this.constants.SuccessMessages.PRODUCT_CATEGORY_DELETED_MESSAGE);
                this.length = this.allCategory.length;
              }
          }
        })
  
  }
SearchProductCategories() {
    this.api.searchProductCategory(this.formData.searchByValue,this.formData.searchByType).subscribe({
      next:(res)=>{
        if(res.data.length==0){
          this.allCategory=res.data;
          $("mat-paginator").hide();
          $("#err_msg").show();
         
        }
        else{
          $("#err_msg").hide();
          $("mat-paginator").show();
          this.length = res.data.length;
          this.tempCategory= res.data;
          this.allCategory=this.tempCategory.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
        
          
        }
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes. FAILED_TO_FETCH_PRODUCT_CATEGORY_DATA_ERROR_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_CATEGORY_DATA_MESSAGE)
            
          } else if (error.error.error.code === this.constants.ErrorCodes.PRODUCT_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toastr.error(this.constants.Messages. PRODUCT_CATEGORY_ID_DOES_NOT_EXISTS_MESSAGE )
          }
          else if (error.error.error.code === this.constants.ErrorCodes.  PRODUCT_CATEGORY_EXIST_ERROR_CODE){
            this.toastr.error(this.constants.Messages. PRODUCT_CATEGORY_EXIST_MESSAGE )
          }else{
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_CATEGORY_DATA_MESSAGE)
           }
         }
         else{
          this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_CATEGORY_DATA_MESSAGE)
         }
      }
     })
  }

}
