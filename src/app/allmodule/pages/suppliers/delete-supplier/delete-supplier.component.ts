import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css']
})
export class DeleteSupplierComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteSupplierComponent>,private api:SupplierService,
    private toastr: ToastrService,private activeRouter:ActivatedRoute, private route:Router,private constants:Constants,

    @Inject(MAT_DIALOG_DATA) public data: { sid: number }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteSupplier(supplierId:number):void {
 
    this.api.DeleteSupplier(supplierId).subscribe({
    
      next:(res) => {
        this.toastr.success(this.constants.SuccessMessages.SUPPLIER_DELETED_MESSAGE);
        this.route.navigate(['/supplier']);
        this.dialogRef.close(res);
  },
      error: (error) => {
        if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_SUPPLIER_ERROR_CODE){
              this.toastr.error(this.constants.Messages. FAILED_TO_DELETE_SUPPLIER_MESSAGE)
            }
            else{
              this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_SUPPLIER_MESSAGE)
             }
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_SUPPLIER_MESSAGE)
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
