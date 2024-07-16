import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-returns',
  templateUrl: './edit-returns.component.html',
  styleUrls: ['./edit-returns.component.css']
})
export class EditReturnsComponent implements OnInit {
  editSalesForm!: FormGroup;
  submitted = false;
  // Option: Option[] = [
  //   {value: 'Supplier Name', viewValue: 'Supplier Name'},
  //   {value: 'PN', viewValue: 'PN'},
  // ]; 

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.editSalesForm = this.formBuilder.group({
      customer: ['', Validators.required],
      referenceno: ['', Validators.required],
      date: ['', Validators.required],})
  }

  get f() { return this.editSalesForm.controls; }
  
  editReturn(){
    this.submitted = true;
    if(!this.editSalesForm.valid){
       return;
    }
  }

}
