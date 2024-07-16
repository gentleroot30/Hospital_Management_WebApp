import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/allmodule/services/api_services/customers.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm!: FormGroup;
  submitted = false;

  AllCategory: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: CustomersService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private constants: Constants
  ) {
    this.SearchCustomerCategories();
  }

  SearchCustomerCategories() {
    this.api.searchCustomerCategory(1, '').subscribe({
      next: (res) => {
        if (res.data.length > 0) {
          this.AllCategory = res.data;
        } else {
          this.AllCategory = res.data;
          this.toastr.show(
            this.constants.Messages.NO_CUSTOMER_CATEGORY_FOUND_MESSAGE
          );
        }
      },
      error: (error) => {
        this.toastr.error(
          this.constants.Messages.FAILED_TO_FETCH_CUSTOMER_CATEGORY_DATA_MESSAGE
        );
      },
    });
  }

  ngOnInit(): void {
    this.addCustomerForm = this.formBuilder.group({
      categoryId: ['', Validators.required],
      ethnicity: ['', [Validators.required,Validators.maxLength(25),Validators.pattern(/^[a-zA-Z\s]*$/)]],
      customerName: ['',[ Validators.required,  Validators.maxLength(25),Validators.pattern(/^[a-zA-Z\s]*$/)]],
      customField_1: ['', [Validators.required,Validators.maxLength(35)]],
      customField_2: ['', [Validators.required,Validators.maxLength(35)]],
      address: ['', [Validators.required,Validators.maxLength(300)]],
      contactNo_1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactNo_2: ['', [Validators.pattern(/^\d{10}$/)]],
      contactNo_3: ['', [Validators.pattern(/^\d{10}$/)]],
    });
  }
  Hide_button = false;
  hidden_1 = true;
  hidden_2 = true;
  addContact() {
    if (this.hidden_1 == false) {
      this.hidden_2 = false;
      this.Hide_button = true;
    } else {
      this.hidden_1 = false;
    }
  }

  get contactArray(): FormArray {
    return this.addCustomerForm.get('contactArray') as FormArray;
  }

  get f() {
    return this.addCustomerForm.controls;
  }

  addCustomer() {
    this.submitted = true;
    if (this.addCustomerForm.valid) {
      this.api.AddCustomer(this.addCustomerForm.value).subscribe({
        next: (res) => {
          this.toastr.success(
            this.constants.SuccessMessages.CUSTOMER_SAVED_MESSAGE
          );
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          debugger
          if (error.error.error) {
            if (
              error.error.error.code ===
              this.constants.ErrorCodes.CUSTOMER_ID_DOES_NOT_EXISTS_ERROR_CODE
            ) {
              this.toastr.error(
                this.constants.Messages.CUSTOMER_ID_DOES_NOT_EXISTS_MESSAGE
              );
            } else if (
              error.error.error.code ===
              this.constants.ErrorCodes.CUSTOMER_NAME_CAN_NOT_BE_BLANK_CODE
            ) {
              this.toastr.error(
                this.constants.Messages.CUSTOMER_NAME_CAN_NOT_BE_BLANK_MESSAGE
              );
            } else if (
              error.error.error.code ===
              this.constants.ErrorCodes
                .CUSTOMER_CONATCT_NO_1_CAN_NOT_BE_BLANK_CODE
            ) {
              this.toastr.error(
                this.constants.Messages
                  .CUSTOMER_CONTACT_NO_1_CAN_NOT_BE_BLANK_MESSAGE
              );
            } else if (
              error.error.error.code ===
              this.constants.ErrorCodes.CUSTOMER_CODE_CAN_NOT_BE_BLANK_CODE
            ) {
              this.toastr.error(
                this.constants.Messages.CUSTOMER_CODE_CAN_NOT_BE_BLANK_MESSAGE
              );
            }
            else if (
              error.error.error.code ===
              this.constants.ErrorCodes.CUSTOMER_CONATCT_NUMBER_ALREADY_EXISTS_CODE
            ) {
              this.toastr.error(
                this.constants.Messages.CUSTOMER_CONATCT_NUMBER_ALREADY_EXISTS_MESSAGE
              );
            } else {
              this.toastr.error(
                this.constants.Messages.FAILED_TO_SAVE_CUSTOMER_MESSAGE
              );
            }
          }
        },
      });
    }
  }
}
