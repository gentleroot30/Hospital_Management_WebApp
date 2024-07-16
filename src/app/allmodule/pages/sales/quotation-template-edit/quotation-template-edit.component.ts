import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../sales.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';

@Component({
  selector: 'app-quotation-template-edit',
  templateUrl: './quotation-template-edit.component.html',
  styleUrls: ['./quotation-template-edit.component.css']
})
export class QuotationTemplateEditComponent implements OnInit {
  editTemplateForm!: FormGroup;
  displayedColumns: string[] = ['productName', 'customField1', 'customField2', 'customField3','action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  allProducts:any[]=[];
  templateProducts:any[]=[];
  submitted = false;
  formData = {
    searchByType: 1,
    searchByValue : '',
  }

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private api: QuotationService,
    private activeRouter: ActivatedRoute, private router:Router, private toaster:ToastrService, private constants:Constants,
  ) { 
    this.getProductList()
  }
  quotationTemplateId: any = 0;
  ngOnInit(): void {
    this.quotationTemplateId = this.activeRouter.snapshot.queryParams['quotationTemplateId']
   
    this.editTemplateForm = this.formBuilder.group({
      quotationTemplateName: [''],
      quotationTemplateDescription: ['',],


    })
    this.api.getQuotationTemplateById(this.quotationTemplateId).subscribe({
      next: (res) => {

        this.editTemplateForm.controls['quotationTemplateName'].setValue(res.data.quotationTemplateName);
        this.editTemplateForm.controls['quotationTemplateDescription'].setValue(res.data.quotationTemplateDescription);
        this.templateProducts = res.data.quotationTempProducts;
        if (res.data.quotationTempProducts) {
          for (var templateProduct of this.templateProducts) {
            for (var product of this.allProducts) {
              if (templateProduct.productId == product.productId) {
                this.allProducts = this.allProducts.filter(p => p !== product);
               
              }
            }
          }
        }
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);

      },
      error:(error)=>{
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.QUOTATION_TEMPLATE_ID_DOES_NOT_EXISTS_ERROR_CODE){
              this.toaster.error(this.constants.Messages.QUOTATION_TEMPLATE_ID_DOES_NOT_EXISTS_MESSAGE)
            }
            else{
              this.toaster.error(this.constants.Messages.QUOTATION_TEMPLATE_ID_DOES_NOT_EXISTS_MESSAGE)
            }
      }
      
    }
  })
  }
  getProductList() {

    this.api.getProducts(1,'').subscribe({
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
  get f(){return this.editTemplateForm.controls;}

  onMatOptionClicked(product:any) {
    this.allProducts = this.allProducts.filter(p => p !== product);
    this.templateProducts.push(product);
     this.dataSource = new MatTableDataSource < PeriodicElement > (this.templateProducts); 
 
   }

   onClickDeleteProductList(product:any){
    this.templateProducts.splice(product,1)
    this.allProducts.push(product)
    this.dataSource=new MatTableDataSource<PeriodicElement>(this.templateProducts);
    
  }

  editQuotationTemplateForm(){
    const productList = this.templateProducts.map(product => {
      const productId = product.productId;
     
      return {
        productId,
       
      };
    });

    const formSubmit = {
    
      quotationTemplateName : this.editTemplateForm.get('quotationTemplateName')?.value,
      quotationTemplateDescription : this.editTemplateForm.get('quotationTemplateDescription')?.value, 
      products: productList,
         
    }

  this.submitted = true;   
    if(this.editTemplateForm.valid){
      this.api.updateQuotationTemplate(this.quotationTemplateId,formSubmit).subscribe({
        next:(res)=>{
          this.toaster.success(this.constants.SuccessMessages.QUOTATION_TEMPLATE_UPDATED_MESSAGE);
          this.router.navigate(['/quotation-template'])    
        },
        error:(error)=> {
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.QUOTATION_TEMPLATE_NAME_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toaster.error(this.constants.Messages.QUOTATION_TEMPLATE_NAME_CAN_NOT_BE_BLANK_MESSAGE);
            }
            else if(error.error.error.code === this.constants.ErrorCodes.PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE){
              this.toaster.error(this.constants.Messages.PRODUCT_CATEGORY_ID_CAN_NOT_BE_BLANK_MESSAGE);
            }
            else if(error.error.error.code === this.constants.ErrorCodes.QUOTATION_TEMPLATE_ID_DOES_NOT_EXISTS_ERROR_CODE){
              this.toaster.error(this.constants.Messages.QUOTATION_TEMPLATE_ID_DOES_NOT_EXISTS_MESSAGE);
            }
            this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_QUOTATION_TEMPLATE_MESSAGE)
          }
          else{
            this.toaster.error(this.constants.Messages.FAILED_TO_UPDATE_QUOTATION_TEMPLATE_MESSAGE)
          }
        }
      })
    }
  }

  }
