import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';


import { Constants } from 'src/app/app.constants';


@Component({
  selector: 'app-delete-customer-category',
  templateUrl: './delete-customer-category.component.html',
  styleUrls: ['./delete-customer-category.component.css']
})
export class DeleteCustomerCategoryComponent implements OnInit {

  @Input() 
  cci!: number; 
  constructor(public dialogRef: MatDialogRef<DeleteCustomerCategoryComponent>,
    private api:CustomersService,private toastr: ToastrService, private constants: Constants, 
    @Inject(MAT_DIALOG_DATA) public data: { cci: number })
     { }

    ccid :number =this.data.cci 

  onNoClick(): void {
    this.dialogRef.close();
  }
  onDeleteClick(id:number): void {
 
    this.api.deleteCustomerCategory(id).subscribe({
    
      next: (res) => {
        
        this.dialogRef.close(res);
  },
      error: (error) => {
      
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_CUSTOMER_CATEGORY_ERROR_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_CUSTOMER_CATEGORY_MESSAGE)
          }
          else{
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_CUSTOMER_CATEGORY_MESSAGE)
           }
        }
        else {
          this.toastr.error(this.constants.Messages.FAILED_TO_DELETED_CUSTOMER_CATEGORY_MESSAGE)
        }
    }
      
    });
  }

 

  ngOnInit(): void {

  }
 
}


