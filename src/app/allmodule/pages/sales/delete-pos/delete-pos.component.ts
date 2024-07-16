import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { PosService } from 'src/app/allmodule/services/api_services/pos.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-delete-pos',
  templateUrl: './delete-pos.component.html',
  styleUrls: ['./delete-pos.component.css']
})
export class DeletePosComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeletePosComponent>,private api:PosService, 
    @Inject(MAT_DIALOG_DATA) public data: { salesid: number },private constants:Constants,private toaster:ToastrService) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {

  }
deleteSale(salesId:number){
  
this.api.deletePos(salesId).subscribe({
  next:(res)=>{
    this.dialogRef.close(res);
  },
  error:(error)=>{
if(error.error.error){
  if(error.error.error.code === this.constants.ErrorCodes.CAN_NOT_DELETE_SALES_WITH_PAYMENTS_ERROR_CODE){
    this.toaster.error(this.constants.Messages.CAN_NOT_DELETE_SALES_WITH_PAYMENTS_MESSAGE)
  }
}
  }
  
})
}
}
