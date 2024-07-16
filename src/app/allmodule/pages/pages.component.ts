import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api_services/api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private api:ApiService) {
    
   }
   access=this.api.sidebaraccess;

  ngOnInit(): void {
  }

}
