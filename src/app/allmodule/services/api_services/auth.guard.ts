import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private apiService: ApiService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot){
          console.log('test',state.url)
         const currentUser = this.apiService.isLoggeddIn();
         
         if(currentUser)
         {
           return true;
         }
         this.apiService.logout();
         return true;
		}
}