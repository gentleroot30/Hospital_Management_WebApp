import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  
  sidebaraccess=true;
  sales=0;
  purchase=0;
  customers=0;
  api_url:any;
  base_url:any;
  appId:any;
  appSecret:any;
  // customHeader:any;
   headers! :HttpHeaders
  // userInfo:any=[];
  body!: HttpHeaders;
  AddAndEditPurchase1= false;
  AddAndEditPurchase2= false;
  AddAndEditPurchase3= false;
 
  local:any='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJheXVzaCBhZ2Fyd2FsIiwiRW1haWxJIjoiYXl1c2hAZ21haWwuY29tIiwibmJmIjoxNjg0MzIxNjAwLCJleHAiOjE2ODQ0MDgwMDAsImlhdCI6MTY4NDMyMTYwMH0.Wi0zkVhwrkhuH7Z0pAnMZZv16gwadA0u84b7v6RDPfw'


  userId:number = 1;


  constructor(private http:HttpClient,
    private route:Router) {

      this.api_url = environment.api_url;
      this.base_url = environment.base_url;
      this.appId = environment.appId;
      this.appSecret = environment.appSecret;
     }

    isLoggeddIn()
    {
      if(this.getToken())
      {
        return true;
      }
        return false;
    }

  loginUser(data: HttpParams)
  {
    let param = new HttpParams();
    param = data;
    return this.http.post(this.api_url+'api​/UserMaster​/Checklogin', param)
  }

  logout()
  {
     localStorage.removeItem('token');
    //localStorage.removeItem('rememberMe');
    this.route.navigate(['/login']);
    //return this.http.get(this.api_url+'api/admin/logout')
  }
  
  forcelogout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    this.route.navigate(['/login']);
  }

    setToken(token: string)
    {
      localStorage.setItem('token', token);
      // this.userDetail();
      // this.setRemberToken(token);
    }

    getToken()
    { 
      var  token =  localStorage.getItem('token');
	  
	   //var   parameters = 'Bearer' + " " + token;
     if(token)
     {
       return 'Bearer '+token;
     }
     this.route.navigate(['/login']);
     return
    }

	setHeader(method='')
    {
      if(method =='')
      {
	
		    // this.headers = new HttpHeaders({'Authorization':this.getToken()});
      }
      else
      {
        this.headers = new HttpHeaders({'app_key':this.appId,'app_secret':this.appSecret});
      }
    }

  //  setRemberToken(token)
  //  {
  //   var  rememberMe =  localStorage.getItem('rememberMe');
  //   if(rememberMe)
  //   {
  //     localStorage.setItem('rememberMe', token);
  //   }
  //  }
   
   
  //  refreshtoken(data)
  //  {
  //    let param = new HttpParams();
  //    param =data;
  //    return this.http.post(this.base_url+'app/api/Token/refresh',param)
  //  }
  postJust(){
    
    return this.http.post<any>('http://localhost:3000/users/role',1);
  }
  postRole(data:any){
    console.log(data);
    return this.http.post("http://localhost:3000/users/role",data);
  }

//users

addRoleUser(data:any){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.local}`
  });
return this.http.post<any>("https://localhost:44379/api/Role",data,{headers});
}
       
       

}
