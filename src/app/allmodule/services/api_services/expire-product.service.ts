import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class ExpireProductService {

  headers! :HttpHeaders
  body!: HttpHeaders;
  constructor(private http:HttpClient,
    private route:Router) { 

    }
    userId = 1;
   
    local:any='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJnZW5pYSIsIkVtYWlsSSI6ImFiY0BnbWFpbC5jb20iLCJuYmYiOjE2OTU4ODgyODEsImV4cCI6MTY5NTk3NDY4MCwiaWF0IjoxNjk1ODg4MjgxfQ.LHbPshiUx53nZkb2MSjzKxn0piCGYHrRgs454cl2-b0'
  
    getExpiredProducts(data:any){
      const headers = new HttpHeaders({
        'UserId': `${this.userId}`, 
        'Authorization': `Bearer ${this.local}`
        });
       const apiUrl = API_ENDPOINTS. getExpiredProducts;
       return this.http.post<any>(apiUrl,data,{headers});
    
    }



    getLowerProducts(data:any){
      const headers = new HttpHeaders({
        'UserId': `${this.userId}`, 
        'Authorization': `Bearer ${this.local}`
        });
       const apiUrl = API_ENDPOINTS. getLowerProducts;
       return this.http.post<any>(apiUrl,data,{headers});
    
    }
    getNearExpireryProducts(daysThreshold:number){


      var data = {
        'daysThreshold': daysThreshold
      }
      const headers = new HttpHeaders({
        'UserId': `${this.userId}`, 
        'Authorization': `Bearer ${this.local}`
        });
       const apiUrl = API_ENDPOINTS. getNearExpireryProducts;
       return this.http.post<any>(apiUrl,data,{headers});
    
    }
  
  }