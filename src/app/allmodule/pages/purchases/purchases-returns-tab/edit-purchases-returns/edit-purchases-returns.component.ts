import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseReturnService } from 'src/app/allmodule/services/api_services/purchase-return.service';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';
export interface PeriodicElement {
  Product_Name: string;
  Slno: number;
  Batch: number;
  Return_Quantity: number;
  Return_Subtotal: number;
  Action: string;
}

interface Options3 {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Slno: 1, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 500, Return_Quantity: 15, Return_Subtotal: 32515, Action: '' },
  { Slno: 2, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 400, Return_Quantity: 8, Return_Subtotal: 65415, Action: '' },
  { Slno: 3, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 600, Return_Quantity: 15, Return_Subtotal: 12000, Action: '' },
  { Slno: 4, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 750, Return_Quantity: 150, Return_Subtotal: 54620, Action: '' },
  { Slno: 5, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 800, Return_Quantity: 6, Return_Subtotal: 5642, Action: '' },
  { Slno: 6, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 1000, Return_Quantity: 5, Return_Subtotal: 1520, Action: '' },
  { Slno: 7, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 1200, Return_Quantity: 3, Return_Subtotal: 542, Action: '' },
  { Slno: 8, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 1550, Return_Quantity: 2, Return_Subtotal: 100, Action: '' },
  { Slno: 9, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 2800, Return_Quantity: 1, Return_Subtotal: 50, Action: '' },
  { Slno: 10, Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch: 3500, Return_Quantity: 1, Return_Subtotal: 20, Action: '' },
];
@Component({
  selector: 'app-edit-purchases-returns',
  templateUrl: './edit-purchases-returns.component.html',
  styleUrls: ['./edit-purchases-returns.component.css']
})
export class EditPurchasesReturnsComponent implements OnInit {


  editPurchasesReturnForm!: FormGroup;
  submitted = false;
  Options3: Options3[] | undefined

  displayedColumns: string[] = ['Slno', 'Product_Name', 'Batch', 'Return_Quantity', 'Return_Subtotal', 'Action'];
  dataSource = ELEMENT_DATA;

  data: any
  cid!: number
  returnId: any;



  constructor(private formBuilder: FormBuilder, private api: PurchaseReturnService, private activeRouter: ActivatedRoute,
    private route: Router) { }





  ngOnInit(): void {
    this.editPurchasesReturnForm = this.formBuilder.group({
      supplier: ['', Validators.required],
      pnNumber: ['', Validators.required],
      status: [false, [Validators.required, Validators.email]],
      date: ['', Validators.required],
    });
  }

  get f() { return this.editPurchasesReturnForm.controls; }

  editPurchasesReturn() {
    this.submitted = true;
    if (!this.editPurchasesReturnForm.valid) {
      this.api.updatePurchaseReturn(this.returnId, this.editPurchasesReturnForm.value).subscribe({
        next: (res: any) => {
          alert("customer updated successfully");
          this.route.navigate(['/purchase']);
        },
        error: (err: any) => {

          alert("something went wrong")
        }
      })

    }

  }
}