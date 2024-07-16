import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { ApiService } from '../services/api_services/api.service';
// import {tap } 'rxjs/operators'

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(public apiService: ApiService,
    private route:Router) {}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

var method ='';
var currentUrl =  request.url.split('/');
var currentAPI =  currentUrl[currentUrl.length-1];

if(currentAPI == 'login' )
{
method ='login';
}

this.apiService.setHeader(method);
request = request.clone({
headers: this.apiService.headers
});
// console.log('api request',request)
return next.handle(request).pipe(
tap(
event => {
 if (event instanceof HttpResponse) {
   switch (event.body.status) {
     case '401':
         // console.log('i am  getiing 401')
         this.apiService.logout();
         break;
     case '409':
         // console.log('i am  getiing 409')
           break;
     case '408':
         this.apiService.logout();                      
         break;
     default:
       console.log(event.body);
       if(event.body.record)
       {
         if(event.body.record.token)
         {
           this.apiService.setToken(event.body.record.token);
           console.log('token set');                  
         }
       }
       else{
         console.log(event.body)
       }
       
       break;
   }

 }
},
error => {
 if (event instanceof HttpErrorResponse) {
   this.route.navigate(['/login']);
 }
}
)
);
// return next.handle(request);
}
}