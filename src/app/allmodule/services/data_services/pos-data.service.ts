import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PosDataService {
  productDetailsObject: any;
 paymentDetailsObject:any;

  constructor() { }

  setProductDetails(productDetails: any) {
   
    this.productDetailsObject = productDetails;
   
  }

  getProductDetails() {
   
    return this.productDetailsObject;
  }

  setPaymentDetails(paymentDetails:any){
  
    this.paymentDetailsObject=paymentDetails;
  }

  getPaymentDetails(){
    
    return this.paymentDetailsObject;
  }
  
 
}
