import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<DeleteUserComponent>,private api:UserService,private toastr:ToastrService,private constants:Constants, 
    @Inject(MAT_DIALOG_DATA) public data: { uid: number }) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  DeleteUser(userId:number): void {

    this.api.deleteUser(userId).subscribe({
    
      next: (res) => {
    
        this.dialogRef.close(res);
  },
      error: (error) => {
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.FAILED_DELETE_USER_CODE){
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_USER_MESSAGE)
          }
          else{
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_USER_MESSAGE)
           }
        }
        else {
          this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_USER_MESSAGE)
        }
    }
      
    });
  }
  ngOnInit(): void {
    
  }


}
