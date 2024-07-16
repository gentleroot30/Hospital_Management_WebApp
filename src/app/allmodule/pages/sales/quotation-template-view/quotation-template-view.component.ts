import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../sales.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';

@Component({
  selector: 'app-quotation-template-view',
  templateUrl: './quotation-template-view.component.html',
  styleUrls: ['./quotation-template-view.component.css']
})
export class QuotationTemplateViewComponent implements OnInit {
  displayedColumns: string[] = [ 'productName', 'customeField1', 'customeField2', 'customField3'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  options: any; 
  viewTemplateForm!:FormGroup;
  submitted = false;
  products:any[]=[];
  
 

  constructor(public dialog: MatDialog, private formBuilder:FormBuilder,private api:QuotationService,
    private activeRouter:ActivatedRoute)
   { 

   }
   quotationTemplateId: any=0;
  ngOnInit(): void {
    debugger
    this.quotationTemplateId = this.activeRouter.snapshot.queryParams['quotationTemplateId']
    this.viewTemplateForm = this.formBuilder.group({
      name: ['' ],
      description: ['',],
     
    });

    this.api.getQuotationTemplateById(this.quotationTemplateId).subscribe({
      next: (res) => {
        //console.log('API Response:', res); // Log API response for debugging
        if (res && res.data) {
          this.viewTemplateForm.controls['name'].setValue(res.data.quotationTemplateName);
          this.viewTemplateForm.controls['description'].setValue(res.data.quotationTemplateDescription);
          this.products = res.data.quotationTempProducts || [];
          //console.log('Products:', this.products); // Log products for debugging
          this.dataSource.data = this.products;
        }
      },
      error: (err) => {
        console.error('API Error:', err); // Log API error for debugging
      }
    });
  }

  get f() { return this.viewTemplateForm.controls; }
}