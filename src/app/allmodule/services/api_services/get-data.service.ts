import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  urlWeb = environment.ip_kps + '';
  httpOptions = {
    headers: new HttpHeaders({      
      'Authorization': "Bearer " +  localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { 
  }
  postData(url: string, payload: any){
    return this.http.post(this.urlWeb + url, payload, this.httpOptions);
  }
  getData(url: string){
    return this.http.get(this.urlWeb + url, this.httpOptions);
  }
  getDataParams(url:string, params:any){
    return this.http.get(url, {params});
  }

}
