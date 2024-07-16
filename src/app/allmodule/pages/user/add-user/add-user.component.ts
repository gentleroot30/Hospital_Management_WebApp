import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'] 
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  submitted = false;
  AllRoles:any[]=[]
  constructor(
    private formBuilder: FormBuilder,private api:UserService,private http:HttpClient,private router:Router,private toastr:ToastrService,private constants:Constants,
  ) { 
    this.searchUsers()
  }

  searchUsers() {
    this.api.searchUsers
    this.api.SearchUserRoles(1,'').subscribe({
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
  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
		  roleId: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(/^[\w\s]{1,30}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(300)]], // Add maxLength validator
      contactNo_1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactNo_2: ['', [ Validators.pattern(/^\d{10}$/)]],
      contactNo_3: ['', [ Validators.pattern(/^\d{10}$/)]],
     
		});
  }
  Hide_button=false;
  hidden_1=true;
  hidden_2=true;
  addContact() {
    if(this.hidden_1==false){
      this.hidden_2=false;
      this.Hide_button=true
    }
    else{
      this.hidden_1=false
    }
  }

  get contactArray(): FormArray {
    return this.addUserForm.get('contactArray') as FormArray;
  }


  get f() { return this.addUserForm.controls; }

  addUser(){
    this.submitted = true;
    if(this.addUserForm.valid){
      this.api.AddUser(this.addUserForm.value).subscribe({
       next:(res)=>{ 
         this.toastr.success(this.constants.SuccessMessages.USER_SAVED_MESSAGE);
         console.log('Generated Password:', res.data.password);
        this.router.navigate(['/user'])
       
       },
       error:(error)=>{
        if(error.error.error){
          if(error.error.error.code === this.constants.ErrorCodes.USER_ID_DOES_NOT_EXISTS){
            this.toastr.error(this.constants.Messages.USER_ID_DOES_NOT_EXIST)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.USER_NAME_CAN_NOT_BE_BLANK_CODE){
            this.toastr.error(this.constants.Messages.USER_NAME_CAN_NOT_BE_BLANK_MESSAGE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.USER_EMAIL_CAN_NOT_BE_BLANK_CODE){
            this.toastr.error(this.constants.Messages.USER_EMAIL_CAN_NOT_BE_BLANK_MESSAGE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.ROLE_NAME_CAN_NOT_BE_BLANK_ERROR_CODE){
            this.toastr.error(this.constants.Messages.ROLE_NAME_CAN_NOT_BE_BLANK)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.INVALID_USER_EMAIL_ERROR_CODE)
          {
            this.toastr.error(this.constants.Messages.INVALID_USER_EMAIL_MESSAGE)
          }
          else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_ADD_USER_CODE)
          {
            this.toastr.error(this.constants.Messages.FAILED_TO_ADD_USER_MESSAGE)
          }

          else{
            this.toastr.error(this.constants.Messages.FAILED_TO_ADD_USER_MESSAGE)
          }
        }
         
       }
      })
    }
    
  }

}