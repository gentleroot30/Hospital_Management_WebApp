import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  headers!: HttpHeaders;
  body!: HttpHeaders;
  constructor(private http: HttpClient,
    private route: Router, private authService: AuthService) { }

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

  AddCustomer(data: any) {
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.addCustomer;
    return this.http.post<any>(apiUrl, data, { headers });
  }
  AddCustomerCategory(data: any) {

    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.addCustomerCategory;
    return this.http.post<any>(apiUrl, data, { headers });
  }


  getCustomerById(customerId: number) {
    var data = {
      "customerId": customerId
    }

    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getCustomerById;
    return this.http.post<any>(apiUrl, data, { headers });
  }

  getCustomerCategoryById(id: number) {
    var data = {
      "categoryId": id,
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getCustomerCategoryById;

    return this.http.post<any>(apiUrl, data, { headers });
  }

  updateCustomer(customerId: number, data: any) {
    data.customerId = customerId;
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.editCustomer;

    return this.http.post<any>(apiUrl, data, { headers });
  }

  updateCustomerCategory(categoryId: number, data: any) {
    data.categoryId = categoryId;
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.updateCustomerCategory;

    return this.http.post<any>(apiUrl, data, { headers });
  }

  DeleteCustomer(customerId: number) {

    var data = {
      'customerId': customerId
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.deleteCustomer;

    return this.http.post<any>(apiUrl, data, { headers })
  }

  deleteCustomerCategory(id: number) {

    var data = {
      "categoryId": id
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.deleteCustomerCategory;

    return this.http.post<any>(apiUrl, data, { headers })
  }

  searchCustomerCategory(searchByType: number, searchByValue: string) {
    var data = {
      "searchByType": searchByType,
      "searchByValue": searchByValue
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.searchCustomerCategory;

    return this.http.post<any>(apiUrl, data, { headers })
  }
  //   getCustomers(searchParams: { fromtDate: string, totDate: string, searchByType: number, searchByValue: string }) {
  //     const headers = new HttpHeaders({
  //         'UserId': `${this.userId}`, 
  //         'Authorization': `Bearer ${this.local}`
  //     });
  //     const apiUrl = API_ENDPOINTS.GetCustomers;

  //     return this.http.post<any>(apiUrl, searchParams, { headers });
  // }






  SearchCustomer(searchByType: number, searchByValue: string, fromtDate?: string, totDate?: string) {
    var data = {
      "searchByType": searchByType,
      "searchByValue": searchByValue
    } as { [key: string]: any };
    if (fromtDate && totDate) {
      data["fromtDate"] = fromtDate;
      data["totDate"] = totDate;
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.searchCustomer;
    return this.http.post<any>(apiUrl, data, { headers });
  }

}

