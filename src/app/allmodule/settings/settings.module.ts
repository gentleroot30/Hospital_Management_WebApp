import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { DocumentsComponent } from './documents/documents.component';
import { ImportStockComponent } from './import-stock/import-stock.component';
import { MyAccountComponent } from './my-account/my-account.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    SettingsComponent,
    SidebarComponent,
    DocumentsComponent,ImportStockComponent, MyAccountComponent,HeaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatSidenavModule,
    MatListModule,MatFormFieldModule,MatIconModule,MatToolbarModule,MatSelectModule,MatInputModule
  ],
  bootstrap: [SettingsComponent],
})
export class SettingsModule { }
