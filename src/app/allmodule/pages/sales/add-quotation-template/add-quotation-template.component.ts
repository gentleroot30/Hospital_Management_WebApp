import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddQuotationTemplateSuccessComponent } from '../add-quotation-template-success/add-quotation-template-success.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable } from 'rxjs/internal/Observable';
import { observable, startWith } from 'rxjs';
import { map } from 'jquery';
import { PeriodicElement } from '../sales.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';
import {  MatDialogRef } from '@angular/material/dialog';


export interface TableData {
  slno: number;
  productName: string;
  customField: string;
  customField2: string;
  customField3: string;
  action: string;
}


@Component({
  selector: 'app-add-quotation-template',
  templateUrl: './add-quotation-template.component.html',
  styleUrls: ['./add-quotation-template.component.css']
})
export class AddQuotationTemplateComponent implements OnInit {

  displayedColumns: string[] = [ 'productName', 'customField1', 'customField2', 'customField3','action'];
  dataSource = new MatTableDataSource < PeriodicElement > ();
  options: any;


  
addTemplateForm!:FormGroup;
  submitted = false;
  allProducts:any[]=[];
  templateProducts:any[]=[];
 
  
  filteredOptions: Observable<unknown[]>=new Observable <string[]>;

  formData = {
    searchByType: 1,
    searchByValue : '',
  }

  constructor(public dialog: MatDialog, private formBuilder:FormBuilder,private api:QuotationService,
    private router:Router,public toaster:ToastrService,private constants:Constants) {
      this.getProductList();
 
   }
  
  

  ngOnInit(): void {

this.addTemplateForm = this.formBuilder.group({
  quotationTemplateName: ['',Validators.required ],
  quotationTemplateDescription: ['',]
  
});


  }
  
 
  get f(){return this.addTemplateForm.controls;}

  
  getProductList()  {
    this.api.getProducts(this.formData.searchByType, this.formData.searchByValue).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        
      },
      error: (error) => {
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_PRODUCT_DATA_ERROR_CODE){
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
           }
            else{
              this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
    
            }
        }
      else{
        this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE)
      }
      },
    });
  }

  onMatOptionClicked(product:any) {

   this.templateProducts.push(product);
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.templateProducts); 
    

  }

  onClickDeleteProductList(product:any){
    this.templateProducts.splice(product,1)
    this.dataSource=new MatTableDataSource<PeriodicElement>(this.templateProducts);
  }
 

  AddQuotationTemplate(){
    const productList = this.templateProducts.map(product => {
      const productId = product.productId;

      return {
        productId,
      };
    });
    const productListIsNull = !productList || productList.length === 0;
    if (productListIsNull) {
      this.toaster.error("Quotation Name and Description cannot be blank");
      return;
  }
    

    const formSubmit = {
      
      quotationTemplateName : this.addTemplateForm.get('quotationTemplateName')?.value,
      quotationTemplateDescription : this.addTemplateForm.get('quotationTemplateDescription')?.value, 
      products: productList,

      
         
    }
    this.submitted = true;   
    if(this.addTemplateForm.valid){
      this.api.addQuotationTemplate(formSubmit).subscribe({
        next:(res)=>{
          this.toaster.success(this.constants.SuccessMessages.QUOTATION_TEMPLATE_SAVED_MESSAGE);
          this.router.navigate(['/quotation-template'])    
        },
        error:(error)=> {
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.QUOTATION_TEMPLATE_NAME_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toaster.error(this.constants.Messages.QUOTATION_TEMPLATE_NAME_CAN_NOT_BE_BLANK_MESSAGE);
            }
           else(error.error.error.code === this.constants.ErrorCodes.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE);{
              this.toaster.error(this.constants.Messages.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE)
           }
            
          }
          else {
            this.toaster.error(this.constants.Messages.FAILED_TO_SAVE_QUOTATION_TEMPLATE_MESSAGE)
          }

        },
      })
    }
  }

}


