import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleReturnDataService {
  productDetailsObject: any;
  paymentDetailsObject:any;
 
   constructor() { }
 
   setReturnProductDetails(productDetails: any) {
    
     this.productDetailsObject = productDetails;
    
   }
 
   getReturnProductDetails() {
    
     return this.productDetailsObject;
   }
 
   setReurnPaymentDetails(paymentDetails:any){
   
     this.paymentDetailsObject=paymentDetails;
   }
 
   getReturnPaymentDetails(){
     
     return this.paymentDetailsObject;
   }
   
}
