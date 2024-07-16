import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { DocumentsComponent } from './documents/documents.component';
import { ImportStockComponent } from './import-stock/import-stock.component';

// Import other components that will be part of the module

// Define your routes
const routes: Routes = [
    {path:'',component:SettingsComponent,children:[
      { path:'account',component:MyAccountComponent },
      { path:'documents',component:DocumentsComponent },
      { path:'importstock', component:ImportStockComponent },
    ]},
    ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }