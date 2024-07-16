import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm!: FormGroup;
  submitted = false;
  customerData:any[]=[]
  customerId: any=0;
  AllCategory:any[]=[];

  constructor(private formBuilder:FormBuilder,private api:CustomersService,private activeRouter:ActivatedRoute,
    private route:Router, private toastr: ToastrService, private constants: Constants) { 
      this.SearchCustomerCategories();
    }


  ngOnInit(): void {
    this.customerId = this.activeRouter.snapshot.queryParams['customerId']
    this.editCustomerForm = this.formBuilder.group({
		  customerCode: ['', Validators.required],
      categoryId: ['', Validators.required],
      ethnicity: ['', [Validators.required,Validators.maxLength(25),Validators.pattern(/^[a-zA-Z\s]*$/)]],
      customerName: ['',[ Validators.required,  Validators.maxLength(25),Validators.pattern(/^[a-zA-Z\s]*$/)]],
      customField_1:['', [Validators.required,Validators.maxLength(35)]],
      customField_2: ['', [Validators.required,Validators.maxLength(35)]],
      address:new FormControl (['', [Validators.required,Validators.maxLength(300)]]),
      contactNo_1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactNo_2: ['', [ Validators.pattern(/^\d{10}$/)]],
      contactNo_3: ['', [ Validators.pattern(/^\d{10}$/)]],
		});
    this.api.getCustomerById(this.customerId).subscribe({
      next:(res)=>{
       
        this.editCustomerForm.controls['customerCode'].setValue(res.data.customerCode);
        this.editCustomerForm.controls['categoryId'].setValue(res.data.categoryId);
        this.editCustomerForm.controls['ethnicity'].setValue(res.data.ethnicity);
        this.editCustomerForm.controls['customerName'].setValue(res.data.customerName);
        this.editCustomerForm.controls['customField_1'].setValue(res.data.customField_1);
        this.editCustomerForm.controls['customField_2'].setValue(res.data.customField_2);
        this.editCustomerForm.controls['address'].setValue(res.data.address);
        this.editCustomerForm.controls['contactNo_1'].setValue(res.data.contactNo_1);
        this.editCustomerForm.controls['contactNo_2'].setValue(res.data.contactNo_2);
        this.editCustomerForm.controls['contactNo_3'].setValue(res.data.contactNo_3);
 
        if(res.data.contactNo_2.length>0)
        this.hidden_1=false;

        if(res.data.contactNo_3.length>0){
        this.hidden_2=false;
        this.Hide_button=true;
        }
      

        
      },
      error:(err)=>{
       this.toastr.error(this.constants.Messages.CUSTOMER_ID_DOES_NOT_EXISTS_MESSAGE);
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
    return this.editCustomerForm.get('contactArray') as FormArray;
  }



  SearchCustomerCategories() {
    
    this.api.searchCustomerCategory(1,'').subscribe({
      next:(res)=>{
        if(res.data.length>0){
          this.AllCategory=res.data;  
        }

        else{
          this.AllCategory= res.data;
         this.toastr.show(this.constants.Messages.NO_CUSTOMER_CATEGORY_FOUND_MESSAGE);
         
        }
      },
      error:(error)=>{
      this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_CATEGORY_DATA_MESSAGE);
      }
     })
  } 
 

  get f() { return this.editCustomerForm.controls; }

  editCustomer(){
    this.submitted = true
    if(this.editCustomerForm.valid){
      this.api.updateCustomer(this.customerId,this.editCustomerForm.value).subscribe({
        next:(res)=>{
          this.toastr.success(this.constants.SuccessMessages.CUSTOMER_UPDATED_MESSAGE);
          this.route.navigate(['/customers']);
        },
        error:(error)=>{

          if(error.error.error.code){
            if(error.error.error.code){
              if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_ID_DOES_NOT_EXISTS_ERROR_CODE){
                this.toastr.error(this.constants.Messages.CUSTOMER_ID_DOES_NOT_EXISTS_MESSAGE)
              }
              else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_UPDATE_CUSTOMER_ERROR_CODE){
                this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_CUSTOMER_MESSAGE)
              }
              else if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_NAME_CAN_NOT_BE_BLANK_CODE){
                this.toastr.error(this.constants.Messages.CUSTOMER_NAME_CAN_NOT_BE_BLANK_MESSAGE)
              }
              else if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_CONATCT_NO_1_CAN_NOT_BE_BLANK_CODE){
                this.toastr.error(this.constants.Messages.CUSTOMER_CONTACT_NO_1_CAN_NOT_BE_BLANK_MESSAGE)
              }
              else if(error.error.error.code === this.constants.ErrorCodes.CUSTOMER_CODE_CAN_NOT_BE_BLANK_CODE){
                this.toastr.error(this.constants.Messages.CUSTOMER_CODE_CAN_NOT_BE_BLANK_MESSAGE)
              }
  
              else{
                this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_CUSTOMER_MESSAGE)
              }
            }
        }
      }

        })
        
      }
   
   
  }

  


}
