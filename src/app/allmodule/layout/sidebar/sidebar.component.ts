import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoleBaseControlService } from '../../services/data_services/role-base-control.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter();
  constructor(public roleAccess:RoleBaseControlService) { }

  onToggleClose() {
    this.closeSideNav.emit();
}
  ngOnInit(): void {
   
  }

}
