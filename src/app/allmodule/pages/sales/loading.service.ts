import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  private loading = false;

  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
