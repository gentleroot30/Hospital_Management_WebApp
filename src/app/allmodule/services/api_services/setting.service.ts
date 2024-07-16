import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  

  constructor(private http: HttpClient) { }

  uploadProfilePhoto(formData: FormData): Observable<any> {
    const url = 'https://localhost:44379/api/AccountSettings/UploadProfilePhoto';
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.handleError));
  }
 
  
  
  uploadImportStock(formData: FormData): Observable<any> {
    const url = 'https://localhost:44379/api/AccountSettings/UploadProfilePhoto';
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
}