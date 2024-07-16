import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnService {
  headers! :HttpHeaders;
  body!: HttpHeaders
  constructor(private http:HttpClient,
    private route:Router,private authService:AuthService) { }
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
  addPurchaseReturn(data: any) {
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.addPurchaseReturn;
    return this.http.post<any>(apiUrl, data, { headers });
  }


  searchPurchaseReturns(searchByType: number, searchByValue: string) {
    var data = {
      "searchByType": searchByType,
      "searchByValue": searchByValue
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.searchPurchaseReturns;
    return this.http.post<any>(apiUrl, data, { headers });
  }

  getPurchaseReturnById(returnId:number){
    var data = {
      "returnId":returnId
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getPurchaseReturnById;
    return this.http.post<any>(apiUrl, data, { headers });
  }



  updatePurchaseReturn(returnId: number, data: any) {
    
    data.returnId = returnId;
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.updatePurchaseReturn;
    return this.http.post<any>(apiUrl, data, { headers });
  }

  DeletePurchaseReturn(returnId: number) {

    var data = {
      'returnId': returnId
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.deletePurchaseReturn;
    return this.http.post<any>(apiUrl, data, { headers });
  }
  getPurchaseByProductIdAndSupplierId(productId: number, supplierId: number) {
    var data = {
      "productId": productId,
      "supplierId": supplierId,

    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getPurchaseByProductIdAndSupplierId;
    return this.http.post<any>(apiUrl, data, { headers });

  }
  getProductBySupplierId(supplierId: number) {
    var data = {
      "supplierId": supplierId
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getProductBySupplierId;
    return this.http.post<any>(apiUrl, data, { headers });
  }
  
}
