import { Component, OnInit } from '@angular/core';
import { DeleteUserComponent } from '../../user/delete-user/delete-user.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SendSmsSuccessComponent } from '../send-sms-success/send-sms-success.component';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit {

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<SendSmsComponent>,) { }



  sendSMSSuccess():void{
    // this.dialog.close(QUOTATION_TEMPLATEEditComponent);
    this.dialog.open(SendSmsSuccessComponent,{
      width:'617px',height:'306px'
    });
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  expandedElement1!: PeriodicElement1 | null;
  displayedColumns1: string[] = ['Select_Supplier','Supplier_id','Supplier_Name',];
  dataSource1 = ELEMENT_DATA1;
  

}

export interface PeriodicElement1 {
  Select_Supplier:string;
  Supplier_id: string;
  Supplier_Name: string;
  
  }
  const ELEMENT_DATA1: PeriodicElement1[] = [
    {Select_Supplier:'', Supplier_id:'001',Supplier_Name:'Rama Krishna Yadav'},
    {Select_Supplier:'', Supplier_id:'125',Supplier_Name:'Siddhartha Satyakama'},
    {Select_Supplier:'', Supplier_id:'456',Supplier_Name:'Arjun Sharma'},
    {Select_Supplier:'', Supplier_id:'987',Supplier_Name:'Febin Thomas'},
    {Select_Supplier:'', Supplier_id:'654',Supplier_Name:'Amit Joshi'},
    {Select_Supplier:'', Supplier_id:'123.',Supplier_Name:'Shikha Sharma'},
    
  ];

