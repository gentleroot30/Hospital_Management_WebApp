import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../configuration';
import { data } from 'jquery';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  sales=0;
  constructor(private http:HttpClient,private authService:AuthService) { }
  public getHeaders(): HttpHeaders {
    const userId = this.authService.getUserId();
    const token = this.authService.getToken();
    if (userId && token) {
      return new HttpHeaders({
        'UserId': `${userId}`,
        'Authorization': `${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }

AddPos(data:any){
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.addPos;
    return this.http.post<any>(apiUrl,data,{headers});
}

getPosById(salesId:number){
  
  var data={
    "salesId": salesId,
  }
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getPosById;
    return this.http.post<any>(apiUrl,data,{headers});
}


  getPos(searchByType:number,searchByValue:string,fromtDate?: string, totDate?: string){
    
    var data={
      "searchByType" : searchByType,
      "searchByValue" : searchByValue
  } 
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.searchPos;
    return this.http.post<any>(apiUrl,data,{headers});
  }

updatePos(salesId:number,data:any){
  
  data.salesId = salesId;
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.updatePos;
    return this.http.post<any>(apiUrl,data,{headers});
}


  deletePos(salesId:number){
    var data={
  "salesId": salesId
    }

    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.deletePos;
      return this.http.post<any>(apiUrl,data,{headers});
  }
  getSalesByProductIdAndCustomerId(productId:number,customerId:number){
    var data = {
      "productId":productId,
      "customerId":customerId
    }
    const headers = this.getHeaders();
     const apiUrl = API_ENDPOINTS.getSalesByProductIdAndCustomerId;
     return this.http.post<any>(apiUrl,data,{headers});
  }

  getProductsByCustomerId(customerId:number){
    var data = {
      "customerId":customerId
    }
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getProductByCustomerId;
      return this.http.post<any>(apiUrl,data,{headers});
  }


  getBatchesByProductId(productId:number){
    var data = {
      "productId":productId
    }
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getBatchesByProductId;
      return this.http.post<any>(apiUrl,data,{headers});
  }

  
}
