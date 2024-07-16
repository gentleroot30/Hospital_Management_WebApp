import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuotationTemplateViewComponent } from '../quotation-template-view/quotation-template-view.component';
import { QuotationTemplateDeleteComponent } from '../quotation-template-delete/quotation-template-delete.component';
import { QuotationTemplateEditComponent } from '../quotation-template-edit/quotation-template-edit.component';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/app.constants';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';
@Component({
  selector: 'app-quotation-template',
  templateUrl: './quotation-template.component.html',
  styleUrls: ['./quotation-template.component.css']
})
export class QuotationTemplateComponent implements OnInit {
  dialogRef: any;
  allQuotationTemplate:any[]=[];
  templateData:any[]=[];
  length = 100;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10,20,30];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  formData = {
    searchByType: 1,
    searchByValue: '' 
  };
  tempQuotationTemplateId:number = 0;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.allQuotationTemplate=this.templateData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
  }






  constructor(
    private router:Router,
    private api:QuotationService,
    public dialog: MatDialog,
    private toaster:ToastrService,
    private constants:Constants) { }


    tempQuotationId:number = 0;





  ngOnInit(): void {

    this.searchTemplates();
  
  }

  viewQuotationTemplateCall(quotationTemplateId:number){
    debugger
    this.router.navigate(['/view-quotation-template'],{queryParams:{'quotationTemplateId':quotationTemplateId}})
   }
   editQuotatioTemplateCall(quotationTemplateId:number){
    
     this.router.navigate(['/edit-quotation-template'],{queryParams:{'quotationTemplateId':quotationTemplateId}})
   }  

  onNoClick(): void {
    this.dialogRef.close();
  }
  categoryOpenDialog(){

  }


quotationTemplateDeleteDialog(quotationTemplateId:number){
 
  this.tempQuotationTemplateId = quotationTemplateId;
  this.dialog.open(QuotationTemplateDeleteComponent,{
    width:'604px',height:'350px',
    data:{qci:quotationTemplateId} 
  }).afterClosed().subscribe((res)=>{  
    
     if(res.status === true){
       
          for(let i=0; i< this.templateData.length; i++){
           if(this.templateData[i].quotationTemplateId == this.tempQuotationTemplateId){
             this.templateData.splice(i,1);
             break;
           }
          }
          this.allQuotationTemplate=this.templateData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
           this.tempQuotationTemplateId = 0;
           this.toaster.success(this.constants.SuccessMessages.QUOTATION_TEMPLATE_DELETED_MESSAGE);
           this.length= this.templateData.length;
         }
   })
 
}
searchTemplates(){
  this.api.searchQuotationTemplate(this.formData.searchByType,this.formData.searchByValue).subscribe({
    next:(res)=> {
      if(res.data.length==0){
        this.templateData=res.data;
        $("mat-paginator").hide();
        $("#err_msg").show();
      }
      else{
        $("#err_msg").hide();
        $("mat-paginator").show(); 
        this.length = res.data.length;
        this.templateData= res.data;
        this.templateData=this.templateData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
      }
    },
    error:(error)=>{

      if(error.error.error.code != undefined){
        
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_QUOTATION_TEMPLATE_DATA_ERROR_CODE){
            this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_QUOTATION_TEMPLATE_DATA_MESSAGE)
          }
         else if(error.error.error.code === this.constants.ErrorCodes.QUOTATION_TEMPLATE_ALREADY_EXISTS_ERROR_CODE){
            this.toaster.error(this.constants.Messages.QUOTATION_TEMPLATE_ALREADY_EXISTS_MESSAGE)
          }
      }
      else {
        this.toaster.error(this.constants.Messages.FAILED_TO_FETCH_QUOTATION_TEMPLATE_DATA_MESSAGE)
      }
  
      }
  })
}
}   

   












