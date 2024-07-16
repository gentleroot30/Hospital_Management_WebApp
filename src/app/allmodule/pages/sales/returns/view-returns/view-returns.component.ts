import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-returns',
  templateUrl: './view-returns.component.html',
  styleUrls: ['./view-returns.component.css']
})
export class ViewReturnsComponent implements OnInit {
  viewReturnForm!: FormGroup;
  submitted = false;
  // Option: Option[] = [
  //   {value: 'Supplier Name', viewValue: 'Supplier Name'},
  //   {value: 'PN', viewValue: 'PN'},
  // ]; 

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.viewReturnForm = this.formBuilder.group({
      customer: ['', Validators.required],
      referenceno: ['', Validators.required],
      date: ['', Validators.required],})
  }

    get f() { return this.viewReturnForm.controls; }
  
    viewSales(){
    this.submitted = true;
    if(!this.viewReturnForm.valid){
       return;
    }
  }

}
