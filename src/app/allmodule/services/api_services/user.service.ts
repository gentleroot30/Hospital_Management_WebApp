import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { API_ENDPOINTS } from '../configuration';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  headers! :HttpHeaders;
  body!: HttpHeaders;

  constructor(private http:HttpClient, private authService:AuthService) { }

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

  SearchUserRoles(searchByType:number,searchByValue:string){
    var data={
      "searchByType" : searchByType,
      "searchByValue" : searchByValue
  } 
  const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getUserRole;
   return this.http.post<any>(apiUrl,data,{headers});
  }


  AddUserRole(data:any){
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.addRole;
   return this.http.post<any>(apiUrl,data,{headers});
  }

  DeleteUserRole(id:number){
    var data={
      "roleId": id
    }  
    const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.deleteRole;
    return this.http.post<any>(apiUrl,data,{headers})
  }

  GetAllFeature(){
    const headers = this.getHeaders();
      const apiUrl = API_ENDPOINTS.getAllFeaures;
        return this.http.post<any>(apiUrl,{headers})
  
}

getRoleFeatures(userId:number){
  
  var data ={
    "userId": userId
  }
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getRoleFeatures;
      return this.http.post<any>(apiUrl,data,{headers})
}

GetRoleById(roleId:number){
 
  var data={
    "roleId": roleId
  }
  const headers = this.getHeaders();
    const apiUrl = API_ENDPOINTS.getUserRoleById;
      return this.http.post<any>(apiUrl,data,{headers})

}

UpdateUserRole(data:any){
//data.roleId = roleId
  const apiUrl = API_ENDPOINTS.updateRole;
  const headers = this.getHeaders();
return this.http.post<any>(apiUrl,data,{headers});
}



searchUsers(searchByType: number, searchByValue: string, fromtDate?: string, totDate?: string) {
  var data = {
      "searchByType": searchByType,
      "searchByValue": searchByValue
  } as { [key: string]: any };
  if (fromtDate && totDate) {
      data["fromtDate"] = fromtDate;
      data["totDate"] = totDate;
  }
  const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.getUsers;
  return this.http.post<any>(apiUrl, data, { headers });
}





AddUser(data: any) {
 
  const apiUrl = API_ENDPOINTS.addUser;
  const headers = this.getHeaders();
  return this.http.post<any>(apiUrl, data, {headers  });
}


getUserById(userId:number){
  var data={
    "userId": userId
  }
    const apiUrl = API_ENDPOINTS.getUserbyId;
    const headers = this.getHeaders();
 return this.http.post<any>(apiUrl,data,{headers});
}

updateUsers(userId:number, data:any){
 
data.userId = userId;
const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.updateUser;

return this.http.post<any>(apiUrl,data,{headers});
}

deleteUser(userId:number){
  
var data = {
  "userId" : userId
}
const headers = this.getHeaders();
  const apiUrl = API_ENDPOINTS.deleteUser;

return this.http.post<any>(apiUrl,data,{headers});
}


}


