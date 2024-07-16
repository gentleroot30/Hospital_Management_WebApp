import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  
  editSupplierForm!: FormGroup;
  submitted = false;
  supplierData:any[]=[]
  supplierId: any;
  // SearchSupplier: any;
  constructor(private formBuilder: FormBuilder,private api:SupplierService,private activeRouter:ActivatedRoute, private constants: Constants,
    private toastr: ToastrService,
    private route:Router) {
      // this.searchSupplier()
     }

  ngOnInit(): void {
    this.supplierId = this.activeRouter.snapshot.queryParams['supplierId']
    this.editSupplierForm = this.formBuilder.group({
      supplierId: new FormControl({ value: '', disabled: true }, Validators.required),
      supplierCode: new FormControl({ value: '', disabled: true }, Validators.required),
      supplierName:new FormControl([''],Validators.required),
      address:new FormControl([''],Validators.required),
      contactNo1: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactNo2: ['', [ Validators.pattern(/^\d{10}$/)]],
      contactNo3: ['', [ Validators.pattern(/^\d{10}$/)]],
		});
    this.api.getSuppliers(this.supplierId).subscribe({
      next:(res)=>{
        this.editSupplierForm.controls['supplierId'].setValue(res.data.supplierId);
        this.editSupplierForm.controls['supplierCode'].setValue(res.data.supplierCode);
        this.editSupplierForm.controls['supplierName'].setValue(res.data.supplierName);
        this.editSupplierForm.controls['address'].setValue(res.data.address);
        this.editSupplierForm.controls['contactNo1'].setValue(res.data.contactNo1);
        this.editSupplierForm.controls['contactNo2'].setValue(res.data.contactNo2);
        this.editSupplierForm.controls['contactNo3'].setValue(res.data.contactNo3);

        if(res.data.contactNo_2 && res.data.contactNo_2.length>0)
        this.hidden_1=false;

        if(res.data.contactNo_3 && res.data.contactNo_3.length>0){
        this.hidden_2=false;
        this.Hide_button=true;
        }
      },
      error:(err)=>{
        // alert("something went wrong")
        this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_SUPPLIER_DATA_MESSAGE);
      }
    }) 
  }
  Hide_button=false;
  hidden_1=true;
  hidden_2=true;

  addContact() {
    if(this.hidden_1==false){
      this.hidden_2=false;
      this.Hide_button=true
    }
    else{
      this.hidden_1=false
    }
  }
  get contactArray(): FormArray {
    return this.editSupplierForm.get('contactArray') as FormArray;
  }
  get f() { return this.editSupplierForm.controls; }

  editSupplier(){
    this.submitted = true;
    if(this.editSupplierForm.valid){
      this.api.updateSupplier(this.supplierId,this.editSupplierForm.value).subscribe({
        next:(res)=>{
          // alert("supplier updated successfully");
          this.toastr.success(this.constants.SuccessMessages.SUPPLIER_UPDATED_MESSAGE);
          this.route.navigate(['/supplier']);
        },
        error:(error)=>{
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.SUPPLIER_FULLNAME_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toastr.error(this.constants.Messages. SUPPLIER_NAME_CAN_NOT_BE_BLANK_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.  FAILED_TO_UPDATE_SUPPLIER_DATA_ERROR_CODE){
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_SUPPLIER_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.SUPPLIER_CONTACT_NO_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toastr.error(this.constants.Messages.SUPPLIER_CONTACT_NO_CAN_NOT_BE_BLANK_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes. SUPPLIER_ADDRESS_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toastr.error(this.constants.Messages.SUPPLIER_ADDRESS_CAN_NOT_BE_BLANK_MESSAGE)
            }
            else{
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_SUPPLIER_MESSAGE)
            }
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_SUPPLIER_MESSAGE)
          }

        }
        })
   }
  }
}
