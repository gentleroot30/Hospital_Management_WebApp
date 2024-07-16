import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UseTemplateViewComponent } from '../use-template-view/use-template-view.component';
import { UseTemplateEditComponent } from '../use-template-edit/use-template-edit.component';
import { UseTemplateEditSuccessComponent } from '../use-template-edit-success/use-template-edit-success.component';
import { PageEvent } from '@angular/material/paginator';
import { UseTemplateConfirmComponent } from '../use-template-confirmation/use-template-confirmation.component';
import { Router } from '@angular/router';
import { QuotationService } from 'src/app/allmodule/services/api_services/quotation-template.service';


@Component({
  selector: 'app-use-template',
  templateUrl: './use-template.component.html',
  styleUrls: ['./use-template.component.css']
})
export class UseTemplateComponent implements OnInit {

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
  constructor(
    public dialog: MatDialogRef<UseTemplateComponent>, public confirmationDialog: MatDialog, private quotationApi:QuotationService,
    private router: Router) {
     
     }
  
    onNoClick(): void {
    
      this.dialog.close();
      
    }
    handlePageEvent(e: PageEvent) {
      this.pageEvent = e;
      this.length = e.length;
      this.pageSize = e.pageSize;
      this.pageIndex = e.pageIndex;
      this.allQuotationTemplate=this.templateData.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    }
  
  ngOnInit(): void {
    this.searchTemplates();
  }
 

  searchTemplates(){
    
    this.quotationApi.searchQuotationTemplate(this.formData.searchByType,this.formData.searchByValue).subscribe({
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
        alert("No Templates available");
        }
    })
  }
 
  confirmUseTemplate(quotationTemplateId:number){
    this.confirmationDialog.open(UseTemplateConfirmComponent,{
      width:'604px',height:'350px',
      data:{qci:quotationTemplateId}
    }).afterClosed().subscribe((res)=>{
      
        this.dialog.close(res)
    })
  
    
 }
 
  
}
