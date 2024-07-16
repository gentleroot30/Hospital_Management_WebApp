import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/api_services/auth.service';
import { UserService } from '../../services/api_services/user.service';
import { Constants } from 'src/app/app.constants';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  errMsg = '';
  userData:any[]=[];
  features:any[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService,
    private toastr: ToastrService,
    private authService: AuthService,
    private constants:Constants,
    private roleService:RoleBaseControlService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    this.loading = true;
    this.errMsg = '';

    if (this.loginForm.invalid) {
      this.errMsg = 'Email id and password required';
      this.loading = false;
      return;
    }

    const email = this.f['email'].value;
    const password = this.f['password'].value;

    // this.authService.login(email, password).subscribe(
    //   (res: boolean) => {
    //     if (res) {
    //       this.toastr.success('Login successful');
    //       this.router.navigate(['/dashboard']);
    //     } else {
    //       this.toastr.error('Bad login');
    //     }
    //     this.loading = false;
    //   },
    //   err => {
    //     if (err.status === 400 && err.error && err.error.error && err.error.error.message) {
    //       this.toastr.error(err.error.error.message);
    //     } else {
    //       this.toastr.error('Bad login');
    //     }
    //     this.loading = false;
    //   }
    // );

    this.authService.login(email,password).subscribe({
      next:(res)=> {  
          if(res.status == true && res.data.userId){
            this.user.getRoleFeatures(res.data.userId).subscribe({
              next:(res)=> {
                const features = res.data.features;
                this.roleService.setFeatures(features)
                this.toastr.success('Login successfully');
                this.router.navigate(['/dashboard']);
              },
              error:(error)=>{
                this.toastr.error("Failed to fetch features")
              }
            })
          }
      },
      error:(error)=>{
        if(error.error.error){
            if(error.error.error.code === this.constants.ErrorCodes.INVALID_LOGIN_EMAIL_ERROR_CODE){
              this.toastr.error(this.constants.Messages.INVALID_EMAIL_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.INVALID_PASSWORD_ERROR_CODE){
              this.toastr.error(this.constants.Messages.INVALID_PASSWORD_MESSAGE)
            }
            else{
              this.toastr.error(this.constants.Messages.INVALID_PASSWORD_MESSAGE)
            }
        }
        else{
          this.toastr.error("Email and password are not match")
        }
      }
    })
  }
 
}