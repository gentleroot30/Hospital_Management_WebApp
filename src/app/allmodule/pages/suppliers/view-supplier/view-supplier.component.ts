import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';
import { Constants } from 'src/app/app.constants';
@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.css']
})
export class ViewSupplierComponent implements OnInit {
  viewSupplierForm!: FormGroup;
  submitted = false;
  AllSupplier:any[]=[] ;
  Hide_button=false;
  hidden_1=true;
  hidden_2=true;

  constructor(private formBuilder: FormBuilder,private api:SupplierService,private activeRouter:ActivatedRoute,private toastr:ToastrService,private constants: Constants) { }
  supplierId: any=0;
  ngOnInit(): void {
    this.supplierId = this.activeRouter.snapshot.queryParams['supplierId']
    this.viewSupplierForm = this.formBuilder.group({
		  supplierId: [''],
      supplierName: [''],
      address: [''],
      contactNo1: ['',Validators.required],
      contactNo2: ['',Validators.required],
      contactNo3: ['',Validators.required],
		});
  
    this.api.getSuppliers(this.supplierId).subscribe({

      next:(res)=>{
       
        this.viewSupplierForm.controls['supplierId'].setValue(res.data.supplierId);
        this.viewSupplierForm.controls['supplierName'].setValue(res.data.supplierName);
        this.viewSupplierForm.controls['address'].setValue(res.data.address);
        this.viewSupplierForm.controls['contactNo1'].setValue(res.data.contactNo1);
        this.viewSupplierForm.controls['contactNo2'].setValue(res.data.contactNo2);
        this.viewSupplierForm.controls['contactNo3'].setValue(res.data.contactNo3);

        if(res.data.contactNo2.length>0)
        this.hidden_1=false;

        if(res.data.contactNo3.length>0){
        this.hidden_2=false;
        this.Hide_button=true;
        }
      },
      error:(err)=>{

        this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_SUPPLIER_DATA_MESSAGE);
      }
      
    })
   

  }
}
