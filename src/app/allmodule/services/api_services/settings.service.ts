import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_ENDPOINTS } from '../configuration';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
         
          
  
  constructor(private http: HttpClient) { }

 
  
  baseUrl = 'https://localhost:44379/api';
 
  uploadHeader(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/AccountSettings/UploadHeader`;
    return this.http.post(url, formData)
      .pipe(
        catchError(this.handleError)
      );
  
  }


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = 'An error occurred: ' + error.error.message;
    } else {
   
      errorMessage = `Backend returned code ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  uploadFooter(formData1: FormData): Observable<any> {
    const url = `${this.baseUrl}/AccountSettings/UploadFooter`;
    return this.http.post(url, formData1)
      .pipe(
        catchError(this.handleError)
      );
    
  }

  uploadProfile(form: FormData): Observable<any> {
    const url = `${this.baseUrl}/AccountSettings/UploadProfilePhoto`;
    return this.http.post(url, form)
      .pipe(
        catchError(this.handleError)
      );
    
  }


}