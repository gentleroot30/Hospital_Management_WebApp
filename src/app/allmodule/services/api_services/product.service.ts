import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from '../configuration';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api_url:any;
  base_url:any;
  appId:any;
  appSecret:any;
  // customHeader:any;
   headers! :HttpHeaders
 

  constructor(private http:HttpClient,
    private route:Router,private authService:AuthService) {
    this.api_url = environment.api_url;
      this.base_url = environment.base_url;
      this.appId = environment.appId;
      this.appSecret = environment.appSecret;
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
   //PRODUCT CATEGORY API INTIGRATION
getProductCategoryById(id:number){
  
  var data={
    "productCategoryId": id
  }
  const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.getProductCategoryById;
  return this.http.post<any>(apiUrl,data,{headers});
}

getProductById(id:number){
  
  var data={
    "productId": id
  }
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getProduct;
  return this.http.post<any>(apiUrl,data,{headers});
}

searchProductCategory(searchByValue:String,searchByType:number){
  var data={
      "searchByType" : searchByType,
      "searchByValue" : searchByValue
  } 
  const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.getProductCategory;
    return this.http.post<any>(apiUrl,data,{headers})
}

addProductCategory(data:any){
  const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.addProductCategory;
    return this.http.post<any>(apiUrl,data,{headers});
}

updateProductCategory(id:number,data:any){
    data.categoryId= id;
    const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.updateProductCategory;
   return this.http.post<any>(apiUrl,data,{headers});
}

deleteProductCategory(id:number){
    var data={
      "categoryId": id
    }
    const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.updateProductCategory;
   return this.http.post<any>(apiUrl,data,{headers});
   
}


  //PRODUCT BRAND API INTIGRATION
 getBrandById(id:number){
    var data={
      "brandId": id
    }
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getBrandById;
      return this.http.post<any>(apiUrl,data,{headers});
     
  }

  getBrands(body : any){
    var data= body
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getBrands;
      return this.http.post<any>(apiUrl,data,{headers});
     
  }

  searchProductBrand(searchByType: number, searchByValue: string){
    var data={
        "searchByType" : searchByType,
        "searchByValue" : searchByValue,
       
    } 
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.searchProductBrand;
      return this.http.post<any>(apiUrl,data,{headers});
  }

  AddBrand(data:any){
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.addProductBrand;
      return this.http.post<any>(apiUrl,data,{headers});
  }

  getAllProducts(searchByType: number, searchByValue: string, fromtDate?: string, totDate?: string){
    var data={
      "searchByType" : searchByType,
      "searchByValue" : searchByValue
  } 
  const headers = this.getHeaders();

      const apiUrl = API_ENDPOINTS.searchProduct;
   
      return this.http.post<any>(apiUrl,data,{headers});
  }
 

  

  UpdateBrand(id:number,data:any){
    data.brandId = id;
    const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.editBrand;
        return this.http.post<any>(apiUrl,data,{headers});
     
    }

 
    deleteBrand(id:number){
      var data={
        "brandId": id
      }
      const headers = this.getHeaders();
        const apiUrl = API_ENDPOINTS.deleteBrand;
        return this.http.post<any>(apiUrl,data,{headers});
        }



        AddProduct(data:any){
          const headers = this.getHeaders();
          const apiUrl = API_ENDPOINTS.addProduct;
      return this.http.post<any>(apiUrl,data,{headers});
      
        }
      
        deleteProduct(id:number){
      
          var data={
            "productId": id
          }
          const headers = this.getHeaders();
          const apiUrl = API_ENDPOINTS.deleteProduct;
          return this.http.post<any>(apiUrl,data,{headers});
        }

        getPurchaseHistoryByProductId(productId:number){
          
          var data={
            "productId": productId
          }
          const headers = this.getHeaders();
            const apiUrl = API_ENDPOINTS.getPurchaseHistory;
            return this.http.post<any>(apiUrl,data,{headers});
        }

        // UpdateProduct(id:number,data:any){
        //   data.brandId = id;
        //   const headers = new HttpHeaders({
        //     'UserId': `${this.userId}`, 
        //     'Authorization': `Bearer ${this.local}`
        //     });

        //     console.log(this.userId);
            
        //     return this.http.post<any>("https://localhost:44379/api/Product/UpdateProduct",data,{headers});
        //   }

          UpdateProduct(id:number,data:any){
            data.productId = id;
            const headers = this.getHeaders();
            const apiUrl = API_ENDPOINTS.getPurchaseHistory;
            return this.http.post<any>(apiUrl,data,{headers});
        
          }

          
       
}
