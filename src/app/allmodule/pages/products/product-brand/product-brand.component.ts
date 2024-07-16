import { Component, OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProductBrandComponent } from './add-product-brand/add-product-brand.component';
import { ViewProductBrandComponent } from './view-product-brand/view-product-brand.component';
import { EditProductBrandComponent } from './edit-product-brand/edit-product-brand.component';
import { DeleteProductBrandComponent } from './delete-product-brand/delete-product-brand.component';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.css']
})
export class ProductBrandComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
// isPaginatorDisabled: boolean = true; 

  AllBrands : any[]=[];
  displayedBrands: any[] = [];
  paginatedBrands: any[] = [];
  length = 100;
  pageSize: number = 10;
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
  handlePageEvent(event: PageEvent) {
    console.log('Page event triggered:', event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedBrands();
  }
  
  
  
  

  constructor(public dialog: MatDialog,private api:ProductService,private router:Router ,  private toastr: ToastrService,private constants:Constants , private cdr: ChangeDetectorRef) { }
  showPaginator() {
    // Show paginator
    this.cdr.detectChanges(); 
  }
  tempBrandId:number = 0;
  ngOnInit(): void {
    this.SearchProductBrands();
  }
  


  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe((event: PageEvent) => {
        this.handlePageEvent(event);
      });
    }
  }
  
  updateDisplayedBrands() {
    this.displayedBrands = this.AllBrands.slice(this.pageSize * this.pageIndex, this.pageSize * this.pageIndex + this.pageSize);
  }

  updatePaginatedBrands(): void {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
      this.paginatedBrands = this.AllBrands.slice(startIndex, endIndex);
      console.log("Paginated brands updated", this.paginatedBrands);
    } else {
      console.error("Paginator not defined in updatePaginatedBrands");
    }
  }
  deleteBrandDialog(brandId: number) {
    this.tempBrandId = brandId;

    this.dialog.open(DeleteProductBrandComponent, {
      width: '607px',
      height: '409px',
      data: { bi: brandId }
    }).afterClosed().subscribe((res) => {
      if (res === true) {
        const brandIndex = this.AllBrands.findIndex(brand => brand.brandId === this.tempBrandId);
        if (brandIndex !== -1) {
          this.AllBrands.splice(brandIndex, 1);
          this.length = this.AllBrands.length;

          // Adjust page index if the current page is empty after deletion
          if (this.paginatedBrands.length === 1 && this.pageIndex > 0) {
            this.pageIndex--;

          }

          this.updatePaginatedBrands();
          this.tempBrandId = 0;
          this.toastr.success(this.constants.SuccessMessages.BRAND_DELETED_MESSAGE);
        }
      }
    });
  }

  brandOpenDialog() {
    this.dialog.open(AddProductBrandComponent,{
      width:'700px',height:'450px',
    }).afterClosed().subscribe(res=>{
      this.SearchProductBrands();
        
    });
  }

  editBrandDialog(brandId:number) {
    this.tempBrandId=brandId;
    this.dialog.open(EditProductBrandComponent,{
      width:'700px',height:'450px',
      data:brandId,
     })
    .afterClosed().subscribe((res)=>{
      
      if (res.status===true){
        this.api.getBrandById(this.tempBrandId).subscribe({     
          next:(res)=>
          this.AllBrands.forEach(element => {
            if (element.brandId==this.tempBrandId){
             element.brandName = res.data.brandName;
             element.description = res.data.description;
             this.tempBrandId = 0;
            this.toastr.success(this.constants.SuccessMessages.BRAND_UPDATED_MESSAGE);
             return;
            }
           })        
        })  
      }
    })
  }

  viewBrandDialog(row:any) {
    
    this.dialog.open(ViewProductBrandComponent,{
      width:'700px',height:'450px',
      data:row,
    });
  }


  

  SearchProductBrands() {


    this.api.searchProductBrand(this.formData.searchByType,this.formData.searchByValue).subscribe({
      next:(res)=>{
        if(res.data.length==0){
          this.AllBrands=res.data;
          $("mat-paginator").hide();

        }
  
        // Update paginatedBrands based on AllBrands and paginator state
        this.pageIndex = 0; // Reset pageIndex to 0
        this.updatePaginatedBrands();
        // this.isPaginatorDisabled = false; // Enable the paginator
        if (this.paginator) {
          this.paginator.firstPage(); // Ensure the paginator resets to the first page
        }
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes. FAILED_TO_FETCH_BRAND_DATA_ERROR_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_BRAND_DATA_MESSAGE)
            
          } else if (error.error.error.code === this.constants.ErrorCodes.BRAND_ID_DOES_NOT_EXISTS_ERROR_CODE){
            this.toastr.error(this.constants.Messages.BRAND_ID_DOES_NOT_EXISTS_MESSAGE )
          }
          else if (error.error.error.code === this.constants.ErrorCodes. BRAND_NAME_ALREADY_EXIST_ERROR_CODE){
            this.toastr.error(this.constants.Messages. BRAND_ALREADY_EXISTS_MESSAGE )
          }else{
            this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_BRAND_DATA_MESSAGE)
           }
         }
         else{
          this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_BRAND_DATA_MESSAGE)
         }
      }
     })
  }

 
}

