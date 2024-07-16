import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<DeleteCustomerComponent>,private api:CustomersService,private toastr: ToastrService, private constants: Constants,
    @Inject(MAT_DIALOG_DATA) public data: { cid: number }) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteCustomer(customerId:number): void {
 
    this.api.DeleteCustomer(customerId).subscribe({
    
      next: (res) => {
        this.dialogRef.close(res);
  },
      error: (error) => {
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_NOT_DELETED_CODE){
            this.toastr.error(this.constants.Messages.CUSTOMER_NOT_DELETED_MESSAGE)
          }
          else{
            this.toastr.error(this.constants.Messages.CUSTOMER_NOT_DELETED_MESSAGE)
           }
        }
        else {
          this.toastr.error(this.constants.Messages.CUSTOMER_NOT_DELETED_MESSAGE)
        }
    }
      
    });
  }
  ngOnInit(): void {
    
  }

}
