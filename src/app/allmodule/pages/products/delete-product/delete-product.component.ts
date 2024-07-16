import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private constants:Constants,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.productService
      .deleteProduct(this.data.productId)
      .subscribe((response: any) => {
        if (response['status']) {
          //alert(response.data.message);
          this.toastr.success('Product deleted successfully');
          this.dialogRef.close(true);

          console.log(response.data.message);
        } else {
          console.log(response['error']);
        }
      });
  }

  toRedirect() {
    console.log('in redirect.');
    this.router.navigate(['product']);
  }

  ngOnInit(): void {}
}
