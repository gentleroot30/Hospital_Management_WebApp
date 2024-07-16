import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from './services/configuration';
@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  
  headers! :HttpHeaders;
  body!: HttpHeaders
  updatePurchaseReturn: any;
  constructor(private http:HttpClient,
    private route:Router,) { }
    local:any='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJheXVzaCBhZ2Fyd2FsIiwiRW1haWxJIjoiYXl1c2hAZ21haWwuY29tIiwibmJmIjoxNjg0MzIxNjAwLCJleHAiOjE2ODQ0MDgwMDAsImlhdCI6MTY4NDMyMTYwMH0.Wi0zkVhwrkhuH7Z0pAnMZZv16gwadA0u84b7v6RDPfw'

  userId:number = 1;

//


  
 

  getAllPurchaseOrders(data: any){
    //console.log("data" , data);
    
    
    const headers = new HttpHeaders({
      'UserId': `${this.userId}`, 
      'Authorization': `Bearer ${this.local}`
      });
   
      return this.http.post<any>("https://localhost:44379/api/PurchaseOrder/GetPurchaseOrders",data,{headers});
  }

  deletePurchaseOrder(purchaseId:number){

    var data={
      "poId": purchaseId
    }
    let httpParams = new HttpParams();
    httpParams.set('poId',purchaseId);
    const headers = new HttpHeaders({
      'UserId': `${this.userId}`, 
      'Authorization': `Bearer ${this.local}`
      });
      return this.http.post<any>("https://localhost:44379/api/PurchaseOrder/DeletePurchaseOrder",data,{headers})
  }

  

  addPurchaseOrders(data: any){
    //console.log("data" , data);
    
    const headers = new HttpHeaders({
      'UserId': `${this.userId}`, 
      'Authorization': `Bearer ${this.local}`
      });
   
      return this.http.post<any>("https://localhost:44379/api/PurchaseOrder/AddPurchaseOrder",data,{headers});
      
  }

  

  updatePurchaseOrders(data: any){
    //console.log("data" , data);
    
    const headers = new HttpHeaders({
      'UserId': `${this.userId}`, 
      'Authorization': `Bearer ${this.local}`
      });
   
      return this.http.post<any>("https://localhost:44379/api/PurchaseOrder/UpdatePurchaseOrder",data,{headers});
      
  }



}
