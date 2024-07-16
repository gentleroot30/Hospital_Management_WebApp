import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  submitted = false;
  isUserLoggedIn= false; 
  loading = false;
  loginData =[];
  errMsg ='';
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    public dialogRef:MatDialogRef<VerifyOtpComponent>,) { }

  ngOnInit(): void {
  }
  createResetPasswordForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.ResetPassword();
    }
  }

  get f() { return this.resetPasswordForm.controls; }

  ResetPassword() {
    this.submitted = true;
    this.loading = true;
    this.errMsg = '';
    if(!this.resetPasswordForm.valid){
       this.errMsg = 'New password and Confirm password required';
       this.loading =false;
       return;
    }
}

onNoClick(): void {
  this.dialogRef.close();
}
VerifyOtp(){
  this.dialog.open(VerifyOtpComponent,{
    width:'1037px',height:'617px'
  });
}
}
