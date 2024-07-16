import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDataService {
  productDetailsObject: any;
 paymentDetailsObject:any;
  constructor() { }
  setPurchaseProductDetails(productDetails: any) {
   
    this.productDetailsObject = productDetails;
   
  }

  getPurchaseProductDetails() {
   
    return this.productDetailsObject;
  }

  setPurchasePaymentDetails(paymentDetails:any){
  
    this.paymentDetailsObject=paymentDetails;
  }

  getPurchasePaymentDetails(){
    
    return this.paymentDetailsObject;
  }
}
