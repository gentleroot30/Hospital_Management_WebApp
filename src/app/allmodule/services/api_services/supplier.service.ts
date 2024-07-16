import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  supplier=0;
  api_url:any;
  base_url:any;
  appId:any;
  headers! :HttpHeaders;
  body!: HttpHeaders;
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

  AddSupplier(data: any){
    const headers = this.getHeaders();

    const apiUrl = API_ENDPOINTS.addSupplier;
    return this.http.post<any>(apiUrl,data,{headers});
  }

  getSuppliers(searchParams: { searchByType: number; searchByValue: string; fromtDate?: string; totDate?: string }) {
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getSuppliers;
    
    // If fromtDate or totDate is not provided, use empty string as default
    const params = {
        searchByType: searchParams.searchByType,
        searchByValue: searchParams.searchByValue,
        fromtDate: searchParams.fromtDate || '',
        totDate: searchParams.totDate || ''
    };

    return this.http.post<any>(apiUrl, params, { headers });
}


  
  updateSupplier(supplierId:number,data:any){
    data.supplierId = supplierId;
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.editSupplier;
    return this.http.post<any>(apiUrl,data,{headers});
  }
 

  searchSupplier(searchByType: number, searchByValue: string, fromtDate?: string, totDate?: string) {
    var data = {
        "searchByType": searchByType,
        "searchByValue": searchByValue
    } as { [key: string]: any };
    if (fromtDate && totDate) {
        data["fromtDate"] = fromtDate;
        data["totDate"] = totDate;
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.searchSupplier;
    return this.http.post<any>(apiUrl, data, { headers });
  }
  
  
  
  
  DeleteSupplier(supplierID:number){
    var data={
      'supplierId': supplierID
    }  
    const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.deleteSupplier;
    return this.http.post<any>(apiUrl,data,{headers})
  }
}
