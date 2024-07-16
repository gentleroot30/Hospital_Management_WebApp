import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import { ApiService } from '../../services/api_services/api.service';

@Component({
  selector: 'app-otp-forgot-password',
  templateUrl: './otp-forgot-password.component.html',
  styleUrls: ['./otp-forgot-password.component.css']
})
export class OtpForgotPasswordComponent implements OnInit {

  dialogRef: any;
  countdownTimer: number =25;
  timerInterval: any;
  currentOtpBoxIndex!: 0;
  // startTimer: any;

  ngOnInit(): void{
    this.startTimer();
  }
  startTimer(): void{
    this.timerInterval = setInterval(() => {
      if (this.countdownTimer > 0) {
        this.countdownTimer--;
      }else{
        clearInterval(this.timerInterval);
      }
    },1000);
  }
  
  ngOnDestroy(): void {
      clearInterval(this.timerInterval);
  }
  resendOTP(): void{
    this.countdownTimer = 25;
    this.startTimer();
  }
  onSubmit(): void {
    this.stopTimerAndNavigateTOResetPassword();
    
  }

  constructor(
    // private formBuilder: FormBuilder,
    private api:ApiService,
    private router:Router,
    public dialog: MatDialog  ) { }

    stopTimerAndNavigateTOResetPassword(): void {
      clearInterval(this.timerInterval);
      // this.dialogRef.close(); 
      this.router.navigate(['/reset-password'])
      // this.router.navigateByUrl('/reset-password');
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  VerifyOtp(){
    this.dialog.open(VerifyOtpComponent,{
      width:'1037px',height:'617px'
    });
 }
 focusNextOtpBox(nextIndex: number): void {
  const nextOtpBox = document.getElementById("otp" + (nextIndex + 1));

  if (nextOtpBox !== null) {
    nextOtpBox.focus();
  }
}
}
