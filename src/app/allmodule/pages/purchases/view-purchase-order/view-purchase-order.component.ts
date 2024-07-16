import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/allmodule/services/api_services/api.service';
import { PurchasesService } from 'src/app/allmodule/services/api_services/purchases.service';



export interface PeriodicElement {
  Slno:number;
  Product_Name: string;
  Quantity: string;
  Current_Stock: string;
  }
  interface Options3 {
    value: string;
    viewValue: string;
  }

/* element code */
  const ELEMENT_DATA: PeriodicElement[] = []
    // {Slno: 123, Product_Name :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.',Quantity:'450',Current_Stock:'12345' },
    // {Slno: 123, Product_Name :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.',Quantity:'450',Current_Stock:'12345'  },
    // {Slno: 123, Product_Name :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.',Quantity:'450',Current_Stock:'12345'  },
    // {Slno: 123, Product_Name :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.',Quantity:'450',Current_Stock:'12345'  },
    // {Slno: 123, Product_Name :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.',Quantity:'450',Current_Stock:'12345'  },
    // {Slno: 123, Product_Name :'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris.',Quantity:'450',Current_Stock:'12345'  },]

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css']
})
export class ViewPurchaseOrderComponent implements OnInit {

 
  addUserForm!: FormGroup;
  submitted = false;
  Options3: Options3[] | undefined
  SelectItem='Add Purchase Order'
  displayedColumns: string[] = ['Slno', 'Product_Name', 'Quantity', 'Current_Stock', 'action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
 placeholder='select'
  id: any;
 element : any


  constructor( private formBuilder: FormBuilder,private api:ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private purchaseService : PurchasesService, ) { 
    
  }

  purchaseNote = ""

  ngOnInit(): void {
    

    this.id = parseInt(this.activatedRoute.snapshot.queryParams['id'])


    this.addUserForm = this.formBuilder.group({
      supplier: ['', Validators.required],
      pnNumber: ['Select role', Validators.required],
      status: [false, [Validators.required, Validators.email]],
      date: ['', Validators.required],
    });


    const request = this.purchaseService.getPurchaseOrderById(this.id)

    request.subscribe((response: any) => {
  
    
      if (response['status']) {
        this.element = response.data;


    const formattedDate = this.formatDate(this.element.poDate);

    this.addUserForm.controls['supplier'].setValue(this.element.supplierName);
    this.addUserForm.controls['pnNumber'].setValue(this.element.poNumber);
    const status = this.element.poStatus === 'Received' ? true : false;


    this.addUserForm.controls['status'].setValue(status);
    this.addUserForm.controls['date'].setValue(formattedDate);
    
    const productData = this.element.productData;

    this.dataSource = new MatTableDataSource<PeriodicElement>(productData);
    
    

    this.purchaseNote = this.element.purchaseNote;
    //console.log(this.purchaseNote , "dataSource");


    
        
      } else {
        this.toastr.error('Something Went Worng');
      }
    });

    
    
    
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} `;
  }

  get f() { return this.addUserForm.controls; }

  addUser(){
    this.submitted = true;
    if(!this.addUserForm.valid){
       return;
    }
  }

  onEditPurchaseOrder() {
    console.log("editing");
    
    this.router.navigate(['edit-purchase-order'],
    { 
      queryParams: { id: this.id }
      
    });
  }

}


