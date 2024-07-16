import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';
import { Constants } from 'src/app/app.constants';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  submitted = false;
  AllRoles:any[]=[];
  userId : number = 0;
  constructor(
    private formBuilder: FormBuilder,private api:UserService,private http:HttpClient,private router:Router,private constants:Constants,private toastr:ToastrService,
    private activeRouter:ActivatedRoute) 
    { 
    this.searchUsers()
    }
  
    
  
  ngOnInit(): void {
    this.userId = this.activeRouter.snapshot.queryParams['userId']
    this.editUserForm = this.formBuilder.group({
      userId:new FormControl(''),
		  roleId: new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required]),
      emailId: new FormControl(['', [Validators.required, Validators.email]]),
      address: new FormControl(['', Validators.required]),
      contactNo_1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactNo_2: ['', [ Validators.pattern(/^\d{10}$/)]],
      contactNo_3: ['', [ Validators.pattern(/^\d{10}$/)]],
      
    });
    
    this.api.getUserById(this.userId).subscribe({
      next:(res)=>{
        this.editUserForm.controls['userId'].setValue(res.data.userId);
        this.editUserForm.controls['roleId'].setValue(res.data.roleId);
        this.editUserForm.controls['name'].setValue(res.data.name);
        this.editUserForm.controls['emailId'].setValue(res.data.emailId);
        this.editUserForm.controls['address'].setValue(res.data.address);
        this.editUserForm.controls['contactNo_1'].setValue(res.data.contactNo_1);
        this.editUserForm.controls['contactNo_2'].setValue(res.data.contactNo_2);
        this.editUserForm.controls['contactNo_3'].setValue(res.data.contactNo_3);
        
        if(res.data.contactNo_2.length>0)
        this.hidden_1=false;

        if(res.data.contactNo_3.length>0){
        this.hidden_2=false;
        this.Hide_button=true;
        }
      },
      
      error:(error)=>{
      this.toastr.error(this.constants.Messages.USER_ID_DOES_NOT_EXIST)
      }
      
    })


  }
  searchUsers() {
    
    this.api.searchUsers(1,'').subscribe({
      next:(res)=>{
        if(res.data.length>0){
          this.AllRoles=res.data;  
        }

        else{
          this.AllRoles= res.data;
         this.toastr.show(this.constants.Messages.NO_ROLE_FOUND_MESSAGE);
         
        }
      },
      error:(error)=>{
      this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_ROLES_DATA_MESSAGE);
      }
     })
  } 

  Hide_button=false;
  hidden_1=true;
  hidden_2=true;
  editContact() {
    if(this.hidden_1==false){
      this.hidden_2=false;
      this.Hide_button=true
    }
    else{
      this.hidden_1=false
    }
  }
  get contactArray(): FormArray {
    return this.editUserForm.get('contactArray') as FormArray;
  }

  

  get f() { return this.editUserForm.controls; }

  editUser(){
    this.submitted = true;
    if(this.editUserForm.valid){
      this.api.updateUsers(this.userId,this.editUserForm.value).subscribe({
        next: (response) => {
          this.toastr.success(this.constants.SuccessMessages.USER_UPDATED_MESSAGE);
          this.router.navigate(['/user']);
        },
      error:(error)=> {
        if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.USER_ID_DOES_NOT_EXISTS){
              this.toastr.error(this.constants.Messages.USER_ID_DOES_NOT_EXIST)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_UPDATE_USER_CODE){
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_USER_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.USER_NAME_CAN_NOT_BE_BLANK_CODE){
              this.toastr.error(this.constants.Messages.USER_NAME_CAN_NOT_BE_BLANK_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.USER_EMAIL_CAN_NOT_BE_BLANK_CODE){
              this.toastr.error(this.constants.Messages.USER_EMAIL_CAN_NOT_BE_BLANK_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.INVALID_USER_ERROR_CODE){
              this.toastr.error(this.constants.Messages.INVALID_USER_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.INVALID_USER_EMAIL_ERROR_CODE)
            {
              this.toastr.error(this.constants.Messages.INVALID_USER_EMAIL_MESSAGE)
            }

            else{
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_USER_MESSAGE)
            }
          }
      
      },
      })
    }
  }

}
