import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingRoutingModule } from './auth-routing-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpForgotPasswordComponent } from './otp-forgot-password/otp-forgot-password.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, OtpForgotPasswordComponent, ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingRoutingModule,
    NgOtpInputModule
  ],
  
})
export class AuthModule { }
