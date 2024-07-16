import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';




@Component({
  selector: 'app-delete-purchase-order',
  templateUrl: './delete-purchase-order.component.html',
  styleUrls: ['./delete-purchase-order.component.css']
})
export class DeletePurchaseOrderComponent implements OnInit {

 
  constructor(  public dialogRef: MatDialogRef<DeletePurchaseOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
      private purchaseService : PurchasesService,
      private router: Router,
      private toastr: ToastrService
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onDelete() {

      console.log("After click",this.data);
      
      this.purchaseService
        .deletePurchaseOrder(this.data.poId)
        .subscribe((response: any) => {
          if (response['status']) {
            //alert(response.data.message);
            this.toastr.success('PUrchase Order deleted successfully');
            console.log(response.data);
            this.dialogRef.close(true);
  
            
          } else {
            console.log(response['error']);
          }
        });

      console.log("In delete");
      
    }

  ngOnInit(): void {

    console.log(this.data.poId);
    

  }

}
