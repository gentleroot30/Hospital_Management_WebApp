import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesReturnService {

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

  getAllSalesRetuns(searchByType:number,searchByValue:string,fromtDate?: string, totDate?: string){
    
      var data={
        "searchByType":searchByType,
        "searchByValue":searchByValue
      }
      const headers = this.getHeaders();
       const apiUrl = API_ENDPOINTS.getSalesReturns;
       return this.http.post<any>(apiUrl,data,{headers});
    
  }

  deleteSalesReturns(returnId:number){ 
      var data = {
       "returnId" : returnId 
      }
      const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.deleteSalesReturns;
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

  addSaleReturns(data:any){

    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.addSalesReturns;
      return this.http.post<any>(apiUrl,data,{headers});
  }

  getSalesReturnById(returnId:number){
    
    var data ={
      'returnId':returnId
    }
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getSalesReturnById;
      return this.http.post<any>(apiUrl,data,{headers});
  }

updateSaleReturns(returnId:number, data:any){
  
  data.returnId = returnId;
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.editSalesReturn;
    return this.http.post<any>(apiUrl,data,{headers});
}
}
