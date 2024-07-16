import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

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

 // Start:Quotation template API methods  
  getQuotationTemplateById(quotationTemplateId:number){
   
    var data={
      "quotationTemplateId": quotationTemplateId
    }
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getQuotationTemplate;
    return this.http.post<any>(apiUrl,data,{headers});
  }

addQuotationTemplate(data:any){
  
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.addQuotationTemplate;
    return this.http.post<any>(apiUrl,data,{headers});


}
updateQuotationTemplate(quotationTemplateId:number,data:any){
  
  data.quotationTemplateId = quotationTemplateId;
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.editQuotationTemplate;
    return this.http.post<any>(apiUrl,data,{headers});
}


searchQuotationTemplate(searchByType:number,searchByValue:string){
  var data={
    "searchByType": searchByType,
    "searchByValue": searchByValue,
  }
  const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.searchQuotationTemplate;
  return this.http.post<any>(apiUrl,data,{headers});

}


deleteQuotationTemplate(quotationTemplateId:number){
  
 var data = {
  "quotationTemplateId" : quotationTemplateId 
 }
 const headers = this.getHeaders();
 const apiUrl = API_ENDPOINTS.deleteQuotationTemplate;
 return this.http.post<any>(apiUrl,data,{headers});

}

getProducts(searchByType:number,searchByValue:string){
  var data={
    "searchByType":searchByType,
    "searchByValue":searchByValue
  }
  const headers = this.getHeaders();
   const apiUrl = API_ENDPOINTS.productList;
   return this.http.post<any>(apiUrl,data,{headers});
}
  // End:Quotation template API methods  



}
