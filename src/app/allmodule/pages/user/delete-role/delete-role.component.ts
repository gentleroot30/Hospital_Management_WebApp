import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent implements OnInit {
 @Input()
  uid!:number;
  constructor(public dialogRef: MatDialogRef<DeleteRoleComponent>,private api:UserService,private toastr: ToastrService,private constants:Constants,
    @Inject(MAT_DIALOG_DATA) public data: {uid:number}) { }

    roleid :number =this.data.uid; 

    onNoClick(): void {
      this.dialogRef.close();
    }

    onDeleteClick(id:number): void {
      
      this.api.DeleteUserRole(id).subscribe({
      
        next: (res) => {
          this.dialogRef.close(res);
    },
        error: (error) => {
        
          if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_DELETE_ROLE_ERROR_CODE){
              this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_ROLE_MESSAGE)
            }
           
          }
          else {
            this.toastr.error(this.constants.Messages.FAILED_TO_DELETE_ROLE_MESSAGE)
          }
        }


      });
    }

  ngOnInit(): void {

  }

 
}
