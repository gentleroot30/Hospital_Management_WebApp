import { error } from 'jquery';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';

@Component({
  selector: 'app-delete-purchases',
  templateUrl: './delete-purchases.component.html',
  styleUrls: ['./delete-purchases.component.css']
})
export class DeletePurchasesComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<DeletePurchasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private purchaseService: PurchasesService,
  private router: Router,
  private toastr: ToastrService,) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    console.log( this.data);

    this.purchaseService
      .deletePurchase(this.data)
      .subscribe((response: any) => {
        if (response['status']) {
          //alert(response.data.message);
          this.toastr.success('Purchase deleted successfully');
          this.dialogRef.close(true);

          console.log(response.data.message);
        } else {
          console.log(response['error']);
          
        }
      });
  }


  ngOnInit(): void {
  }

}
