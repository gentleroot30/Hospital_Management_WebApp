import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api_services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() SideNavToggle = new EventEmitter();  

  
  constructor(private api:ApiService,private router:Router,private location:Location) { 
    console.log(this.location.path())
    if(this.location.path()=='/my-account'){
      this.api.sidebaraccess=false;
    }
    console.log(this.api.sidebaraccess)
  }

  openSidenav() {
    this.SideNavToggle.emit();
 }

  ngOnInit(): void {
  }

}
