import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/allmodule/services/api_services/expenses.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.css']
})
export class ViewExpensesComponent implements OnInit {

  viewExpensesForm!: FormGroup;
  submitted = false;
  data:any
  cid!:number;
  expenseData:any[]=[]
  constructor(private formBuilder:FormBuilder,private api:ExpensesService,private activeRouter:ActivatedRoute,private toastr: ToastrService, private constants: Constants) { }
  expenseId: any=0;

  ngOnInit(): void {
    
    this.expenseId = this.activeRouter.snapshot.queryParams['expenseId'];
    this.viewExpensesForm = this.formBuilder.group({
      expenseId:[''],
      categoryName:[''],
      amount:[''],
		  expenseDate: [''],
      expenseNote:[''],
    });
    
    this.api.getExpensesById(this.expenseId).subscribe({
      next:(res)=>{
       
        this.viewExpensesForm.controls['expenseId'].setValue(res.data.expenseId);
        this.viewExpensesForm.controls['categoryName'].setValue(res.data.categoryName);
        this.viewExpensesForm.controls['amount'].setValue(res.data.amount);
        this.viewExpensesForm.controls['expenseDate'].setValue(res.data.expenseDate);
        this.viewExpensesForm.controls['expenseNote'].setValue(res.data.expenseNote);
    },
    error:(err)=>{
      this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_EXPENSE_DATA_MESSAGE);
    }
  })
  
  }
  
}


