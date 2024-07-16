import { data } from 'jquery';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  
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



  addPurchase(data:any){
    
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.addNewPurchase;
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
  uploadPurchaseDocuments(fileUploadData:any){
    var formattedObject = {
      file: fileUploadData.file,
      documentTypes: fileUploadData.documentTypes,
      purchaseId: fileUploadData.purchaseId
    };
  
    const formData = new FormData();
      formData.append('file', fileUploadData.file);
      formData.append('documentTypes', fileUploadData.documentTypes.toString());
      formData.append('purchaseId',fileUploadData.purchaseId.toString());
      const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.uploadPurchaseDocuments;
      return this.http.post<any>(apiUrl,formData,{headers});
  }


  
  deletePurchaseDocuments(documentId:any){
    
    var data = {
      "purchaseDocumentId" : documentId
    }
    const headers = this.getHeaders();
     const apiUrl = API_ENDPOINTS.deletePurchaseDocuments;
     return this.http.post<any>(apiUrl,data,{headers});
  }

  getPurchaseById(purchaseId: any){
    
    var data={
      "purchaseId": purchaseId
    }
    
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getPurchaseById;
      return this.http.post<any>(apiUrl, data, { headers });
  }

  updatePurchases(purchaseId:number,data:any){
    data.purchaseId = purchaseId;
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.updatePurchase;
    return this.http.post<any>(apiUrl, data, { headers });

  }

  getAllPurchaseOrders(data: any){

    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getPurchaseOrder;
    return this.http.post<any>(apiUrl, data, { headers });
  }

  deletePurchaseOrder(purchaseOrderId:number){

    var data={
      "poId": purchaseOrderId
    }

    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.deletePurchaseOrder;
    return this.http.post<any>(apiUrl, data, { headers });
  }

  deletePurchase(purchaseId:number){
    var data={
      "purchaseId": purchaseId
    }
    
    const headers = this.getHeaders();
      return this.http.post<any>("https://localhost:44379/api/Purchase/DeletePurchase",data,{headers})
  }

  

  addPurchaseOrders(data: any){
    //console.log("data" , data);
    
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.addPurchaseOrder;
    return this.http.post<any>(apiUrl, data, { headers });
      
  }

  

  updatePurchaseOrders(data: any){
    //console.log("data" , data);
    
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.updatePurchaseOrder;
    return this.http.post<any>(apiUrl, data, { headers });
      
      
  }

  

  getPurchaseOrderById(id: any){
    
    var data={
      "poId": id
    }
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getPurchaseById;
    return this.http.post<any>(apiUrl, data, { headers });
  }

  getAllPurchase(data:any){
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getPurchase;
    return this.http.post<any>(apiUrl, data, { headers });
  }

 


}
