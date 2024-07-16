import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reports-edit',
  templateUrl: './reports-edit.component.html',
  styleUrls: ['./reports-edit.component.css']
})
export class ReportsEditComponent implements OnInit {
  editReportsForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder
  ) { }
  ngOnInit(): void {
    this.editReportsForm = this.formBuilder.group({
		  Product_Name: ['', Validators.required],
      Unit_Price: ['', Validators.required],
      Current_Stock: ['', Validators.required,],
      Current_Stock_Value: ['', Validators.required],
      Units_Sold:['', Validators.required,],
      });
  }
  get f() { return this.editReportsForm.controls; }
  }