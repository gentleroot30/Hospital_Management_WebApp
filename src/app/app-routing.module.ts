import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './allmodule/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './allmodule/auth/login/login.component';
import { OtpForgotPasswordComponent } from './allmodule/auth/otp-forgot-password/otp-forgot-password.component';
import { ResetPasswordComponent } from './allmodule/auth/reset-password/reset-password.component';
import { MyAccountComponent } from './allmodule/settings/my-account/my-account.component';
import { ImageViewerComponent } from '../app/image-viewer.component';



const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'admin',loadChildren:()=>import("./allmodule/pages/pages.module").then(m=>m.PagesModule), canActivate: []},
  {path:'login',loadChildren:()=>import("./allmodule/auth/auth.module").then(m=>m.AuthModule)},
  {path:'settings',loadChildren:()=>import("./allmodule/settings/settings.module").then(m=>m.SettingsModule),canActivate: []},
  { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'otp-forgot-password', component:OtpForgotPasswordComponent},
  { path: 'reset-password', component:ResetPasswordComponent},
  { path: 'image', component: ImageViewerComponent }
  
  
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

