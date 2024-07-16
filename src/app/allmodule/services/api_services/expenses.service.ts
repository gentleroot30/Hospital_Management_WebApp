import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenses = 0;
  api_url: any;
  base_url: any;
  appId: any;
  headers!: HttpHeaders;
  body!: HttpHeaders;
  constructor(private http: HttpClient,
    private route: Router,private authService:AuthService) {
     
     }
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
    
  AddExpenses(data: any) {
    // console.log("data", data)
    // console.log("data",typeof data.expense_note)
    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.addExpenses
    return this.http.post<any>(api_url, data, { headers });
  }
  AddExpensesCategory(data: any) {

    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.addExpensesCategory
    return this.http.post<any>(api_url, data, { headers });
  }
  getExpensesById(expenseId: number) {
    var data = {
      'expenseId': expenseId
    }

    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.getExpensesById
    return this.http.post<any>(api_url, data, { headers });
  }
  getExpensesCategoryById(id: number) {
    var data = {
      "categoryId": id,
    }
    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.getExpensesCategoryById
    return this.http.post<any>(api_url, data, { headers });
  }
  updateExpenses(expenseId: number, data: any) {
    data.expenseId = expenseId;
    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.updateExpenses
    return this.http.post<any>(api_url, data, { headers });
  }
  updateExpensesCategory(categoryId: number, data: any) {
    data.categoryId = categoryId;
    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.updateExpensesCategory
    return this.http.post<any>( api_url, data, { headers });
  }
  DeleteExpenses(expenseId: number) {
    var data = {
      'expenseId': expenseId
    }
    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.deleteExpenses
    return this.http.post<any>(api_url, data, { headers })
  }
  deleteExpensesCategory(categoryId: number) {
    
    var data = {
      "categoryId": categoryId
    }
    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.deleteExpensesCategory
    return this.http.post<any>( api_url, data, { headers })
  }


  searchExpensesCategory(searchByType: number, searchByValue: string) {
    var data = {
      "searchByType": searchByType,
      "searchByValue": searchByValue
    }
    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.searchExpensesCategory
    return this.http.post<any>( api_url, data, { headers })
  }


  SearchExpense(searchByType: number, searchByValue: string) {
    var data = {
      "searchByType": searchByType,
      "searchByValue": searchByValue,
    }
    const headers = this.getHeaders();
    const api_url = API_ENDPOINTS.searchExpenses
    return this.http.post<any>(api_url, data, { headers })
  }


}
