import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  
  

  headers! :HttpHeaders
  body!: HttpHeaders;
  constructor(private http:HttpClient,
    private route:Router,private authService:AuthService) { 

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
  
  getQuotation(searchByType:number,searchByValue:string, fromtDate?: string, totDate?: string){
    var data = {
      "searchByType":searchByType,
    "searchByValue":searchByValue,
    }
    const headers = this.getHeaders();
     const apiUrl = API_ENDPOINTS.getQuotations;
     return this.http.post<any>(apiUrl,data,{headers});
  }

addQuotation(data:any){
  const headers = this.getHeaders();
   const apiUrl = API_ENDPOINTS.addQuotation;
   return this.http.post<any>(apiUrl,data,{headers});

}

getQuotationById(quotationId:number){
 
  var data = {
    "quotationId" : quotationId
  }
  const headers = this.getHeaders();
   const apiUrl = API_ENDPOINTS.getQuotationByID;
   return this.http.post<any>(apiUrl,data,{headers});

}

updateQuotation(quotationId:number,data:any){
  
data.quotationId = quotationId;
const headers = this.getHeaders();
 const apiUrl = API_ENDPOINTS.updateQuotation;
 return this.http.post<any>(apiUrl,data,{headers});

}

  deleteQuotation(quotationId:number){
   
 var data = {
      quotationId : quotationId
    }
    const headers = this.getHeaders();
     const apiUrl = API_ENDPOINTS.deleteQuotation;
     return this.http.post<any>(apiUrl,data,{headers});
  }

uploadQuotationDocuments(fileUploadData:any){
  var formattedObject = {
    file: fileUploadData.file,
    documentTypes: fileUploadData.documentTypes,
    quotationId: fileUploadData.quotationId
  };

  const formData = new FormData();
    formData.append('file', fileUploadData.file);
    formData.append('documentTypes', fileUploadData.documentTypes.toString());
    formData.append('quotationId',fileUploadData.quotationId.toString());
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.uploadQuotationDocuments;
    return this.http.post<any>(apiUrl,formData,{headers});
}

deleteQutationDocuments(documentId:any){
  
  var data = {
    quoatationDocumentId : documentId
  }
  const headers = this.getHeaders();
   const apiUrl = API_ENDPOINTS.deleteQuotationDocuments;
   return this.http.post<any>(apiUrl,data,{headers});
}

dowloadQuotation(quoatationDocumentId:number){
  

  const headers = this.getHeaders();
 const apiUrl = API_ENDPOINTS.downloadQutationDocuments;
 return this.http.post<any>(apiUrl,quoatationDocumentId,{headers});
}

// End:Quotation  API methods  

 


    
}
