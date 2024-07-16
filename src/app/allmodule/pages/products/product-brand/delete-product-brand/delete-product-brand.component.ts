import { Component,Inject,Input,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';

import { Constants } from 'src/app/app.constants';
@Component({
  selector: 'app-delete-product-brand',
  templateUrl: './delete-product-brand.component.html',
  styleUrls: ['./delete-product-brand.component.css']
})
export class DeleteProductBrandComponent implements OnInit {
  @Input()
  bi!: number;

  constructor(private api:ProductService, private toastr: ToastrService,private constants:Constants,
    public dialogRef: MatDialogRef<DeleteProductBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {bi: number}) { }

    bid: number = this.data.bi

    onNoClick(): void {
      this.dialogRef.close();
    }

    onDeleteClick(id:number):void{
    
      // console.log(this.data);
      // console.log(id);
      // const id=this.bid;
      // console.log(id);
  
      this.api.deleteBrand(id).subscribe({
        next:(res)=>{
          this.dialogRef.close(true);
        },
        error:(error)=>{
          if(error.error.error){
              if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_BRAND_ERROR_CODE){
                this.toastr.error(this.constants.Messages. FAILED_TO_DELETE_BRAND_MESSAGE)
              }
              else{
                this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_BRAND_MESSAGE)
               }
            }
            else {
              this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_BRAND_MESSAGE)
            }
          // this.toastr.error(
          //   `Error while adding product : ${Response['error']}`
          // );
          // alert('Something went wrong');
        }
      });
  
    }

  ngOnInit(): void {
  }

}
