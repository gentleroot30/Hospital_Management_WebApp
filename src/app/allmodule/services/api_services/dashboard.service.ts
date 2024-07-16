import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  api_url:any;
  base_url:any;
  appId:any;
  appSecret:any;
  // customHeader:any;
   headers! :HttpHeaders
  local:any='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJheXVzaCBhZ2Fyd2FsIiwiRW1haWxJIjoiYXl1c2hAZ21haWwuY29tIiwibmJmIjoxNjg0MzIxNjAwLCJleHAiOjE2ODQ0MDgwMDAsImlhdCI6MTY4NDMyMTYwMH0.Wi0zkVhwrkhuH7Z0pAnMZZv16gwadA0u84b7v6RDPfw'
  userId:number = 1;

  constructor(private http:HttpClient,
    private route:Router) {
    this.api_url = environment.api_url;
      this.base_url = environment.base_url;
      this.appId = environment.appId;
      this.appSecret = environment.appSecret;
   }

   getDashboardData(){
    var data={
      "userId": this.userId
    }
    const headers = new HttpHeaders({
      'UserId': `${this.userId}`, 
      'Authorization': `Bearer ${this.local}`
      });
    return this.http.post<any>("https://localhost:44379/api/DashBoard/GetDashboardData",data,{headers});
   }

   getSalesAndPurchases(chartDataType:Number){
    var data = {
      'chartDataType': chartDataType ,
      'userId': this.userId
    }
    const headers = new HttpHeaders({
      'UserId': `${this.userId}`, 
      'Authorization': `Bearer ${this.local}`
    });
    return this.http.post<any>("https://localhost:44379/api/DashBoard/GetSalesAndPurchases",data,{headers})
      .pipe(
        tap(response => console.log('Sales and Purchases Data:', response)),
        catchError(error => {
          console.error('Error fetching Sales and Purchases data:', error);
          throw error;
        })
      );
  }
  

   getSalesBytProductData(chartDataType:Number){
    var data = {
      'chartDataType': chartDataType ,
      'userId': this.userId
    }
    const headers = new HttpHeaders({
      'UserId': `${this.userId}`, 
      'Authorization': `Bearer ${this.local}`
      });
    return this.http.post<any>("https://localhost:44379/api/DashBoard/GetSalesByProductData",data,{headers});
   }
  
}
