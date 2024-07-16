import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteProductBrandComponent } from '../../product-brand/delete-product-brand/delete-product-brand.component';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
@Component({
  selector: 'app-delete-product-category',
  templateUrl: './delete-product-category.component.html',
  styleUrls: ['./delete-product-category.component.css']
})
export class DeleteProductCategoryComponent implements OnInit {
  @Input()
  pci!: number;
  
  constructor(private api:ProductService, private toastr: ToastrService,private constants:Constants,
    public dialogRef: MatDialogRef<DeleteProductBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {pci: number}) { }

   pcid: number = this.data.pci

   onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(id:number):void{
    this.api.deleteProductCategory(id).subscribe({
      next:(res)=>{
        // this.toastr.success('Product Category deleted successfully');
        this.dialogRef.close(true);
      },
      error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.PRODUCT_CATEGORY_NOT_DELETED_CODE){
            this.toastr.error(this.constants.Messages. FAILED_TO_DELETE_PRODUCT_CATEGORY_MESSAGE )
          }
          else{
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_PRODUCT_CATEGORY_MESSAGE)
           }
        }
        else {
          this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_PRODUCT_CATEGORY_MESSAGE)
        }
      }
    });

  }

  ngOnInit(): void {
  }

}
