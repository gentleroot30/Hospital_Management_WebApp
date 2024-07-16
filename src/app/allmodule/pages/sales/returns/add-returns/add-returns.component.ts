import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Option {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-returns',
  templateUrl: './add-returns.component.html',
  styleUrls: ['./add-returns.component.css']
})
export class AddReturnsComponent implements OnInit {
  addSalesForm!: FormGroup;
  submitted = false;
  Option: Option[] = [
    {value: 'Supplier Name', viewValue: 'Supplier Name'},
    {value: 'PN', viewValue: 'PN'},
  ]; 
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.addSalesForm = this.formBuilder.group({
      customer: ['', Validators.required],
      referenceno: ['', Validators.required],
      date: ['', Validators.required],

  })

  }
  get f() { return this.addSalesForm.controls; }
  
  addUser(){
    this.submitted = true;
    if(!this.addSalesForm.valid){
       return;
    }
  }
}

