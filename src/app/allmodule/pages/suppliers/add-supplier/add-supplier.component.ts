import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from 'src/app/allmodule/services/api_services/supplier.service';
import { Constants } from 'src/app/app.constants';

// Custom validator to check for only spaces
function noOnlySpaces(control: AbstractControl) {
  if (control.value != null && control.value.trim().length === 0) {
    return { 'onlySpaces': true };
  }
  return null;
}

function maxCharacters(limit: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    if (value.length > limit) {
      return { 'maxLength': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  addSupplierForm!: FormGroup;
  submitted = false;
  AddSupplierForm: any;

  constructor(
    private formBuilder: FormBuilder, private http: HttpClient,private api: SupplierService,private activeRouter: ActivatedRoute, private route: Router,private toastr: ToastrService,private constants: Constants
  ) { }

  ngOnInit(): void {
    this.addSupplierForm = this.formBuilder.group({
      suppliername: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      address: ['', [Validators.required, noOnlySpaces, maxCharacters(300)]],
      contactNo_1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactNo_2: ['', Validators.pattern(/^\d{10}$/)],
      contactNo_3: ['', Validators.pattern(/^\d{10}$/)],
      contactArray: new FormArray([
        new FormGroup({
          contact: new FormControl(''),
        })
      ])
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
    return this.addSupplierForm.get('contactArray') as FormArray;
  }

  get f() { return this.addSupplierForm.controls; }

  validateFullName(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^A-Za-z]/g, '');
  }

  validatePaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text') || '';
    if (/[^A-Za-z]/.test(pastedText)) {
      event.preventDefault();
    }
  }

  validateAddress(event: any) {
    const input = event.target;
    const words = input.value.trim().split(/\s+/);
    if (words.length > 50) {
      input.value = words.slice(0, 50).join(' ');
    }
  }


  addSupplier() {
    this.submitted = true; 
    if (this.addSupplierForm.valid) {
      this.api.AddSupplier(this.addSupplierForm.value).subscribe({
        next: (res) => {
          this.toastr.success(this.constants.SuccessMessages.SUPPLIER_SAVED_MESSAGE);
          this.route.navigate(['/supplier']);
        },
        error: (error) => {
          if (error.error.error) {
            if (error.error.error.code === this.constants.ErrorCodes.SUPPLIER_FULLNAME_CAN_NOT_BE_BLANK_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.SUPPLIER_NAME_CAN_NOT_BE_BLANK_MESSAGE);
            } else if (error.error.error.code === this.constants.ErrorCodes.SUPPLIER_CONTACT_NO_CAN_NOT_BE_BLANK_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.SUPPLIER_CONTACT_NO_CAN_NOT_BE_BLANK_MESSAGE);
            } else if (error.error.error.code === this.constants.ErrorCodes.SUPPLIER_ADDRESS_CAN_NOT_BE_BLANK_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.SUPPLIER_ADDRESS_CAN_NOT_BE_BLANK_MESSAGE);
            } else {
              this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_SUPPLIER_MESSAGE);
            }
          } else {
            this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_SUPPLIER_MESSAGE);
          }
        },
      });
    }
  }
}
