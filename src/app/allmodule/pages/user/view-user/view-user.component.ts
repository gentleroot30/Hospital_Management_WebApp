import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  viewUserForm!: FormGroup;
  AllRoles:any[]=[];
  userId : number = 0;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,private api:UserService,private http:HttpClient,private router:Router,
    private activeRouter:ActivatedRoute
  ) { 
    this.searchUsers()
  }

  ngOnInit(): void {
    this.userId = this.activeRouter.snapshot.queryParams['userId']
    this.viewUserForm = this.formBuilder.group({
      userId:new FormControl(''),
		  roleName: new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required]),
      emailId: new FormControl(['', [Validators.required, Validators.email]]),
      address: new FormControl(['', Validators.required]),
      contactNo_1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactNo_2: ['', [ Validators.pattern(/^\d{10}$/)]],
      contactNo_3: ['', [ Validators.pattern(/^\d{10}$/)]],
    
		});

    this.api.getUserById(this.userId).subscribe({
      next:(res)=>{
        this.viewUserForm.controls['userId'].setValue(res.data.userId);
        this.viewUserForm.controls['roleName'].setValue(res.data.roleName);
        this.viewUserForm.controls['name'].setValue(res.data.name);
        this.viewUserForm.controls['emailId'].setValue(res.data.emailId);
        this.viewUserForm.controls['address'].setValue(res.data.address);
        this.viewUserForm.controls['contactNo_1'].setValue(res.data.contactNo_1);
        this.viewUserForm.controls['contactNo_2'].setValue(res.data.contactNo_2);
        this.viewUserForm.controls['contactNo_3'].setValue(res.data.contactNo_3);

        if(res.data.contactNo_2.length>0)
        this.hidden_1=false;

        if(res.data.contactNo_3.length>0){
        this.hidden_2=false;
        this.Hide_button=true;
        }
      },
      error(err){
      
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
         alert("No Roles available");
         
        }
      },
      error:(error)=>{
      alert("something went wrong");
      }
     })
  } 
  get contactArray(): FormArray {
    return this.viewUserForm.get('contactArray') as FormArray;
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

  get f() { return this.viewUserForm.controls; }

  viewUser(){
    this.submitted = true;
    if(!this.viewUserForm.valid){
       return;
    }
  }

}