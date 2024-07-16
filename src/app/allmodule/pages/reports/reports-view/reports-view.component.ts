import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.css']
})
export class ReportsViewComponent implements OnInit {
  viewReportsForm!: FormGroup;
  submitted = false;
  
 

  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.viewReportsForm = this.formBuilder.group({
		  Product_Name: ['', Validators.required],
      Unit_Price: ['', Validators.required],
      Current_Stock: ['', Validators.required,],
      Current_Stock_Value: ['', Validators.required],
      Units_Sold:['', Validators.required,],
      });
  }
  get f() { return this.viewReportsForm.controls; }
}
  

