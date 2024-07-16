import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlWeb = 'https://localhost:44379/api/Login/Login';
  private tokenKey = 'accessToken';
  private userKey = 'userId';  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    
    const input = { Email: email, Password: password };
    return this.http.post<any>(this.urlWeb, input).pipe(
      tap(result => {
        localStorage.setItem(this.tokenKey, result.data.accessToken);
        localStorage.setItem(this.userKey, result.data.userId); 
      })
    );
  }

  getToken() {
    
    const token = localStorage.getItem(this.tokenKey);
   return token
  }

  getUserId() {
    
    const userId = localStorage.getItem(this.userKey);
    return userId ? +userId : null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    
  }
}
