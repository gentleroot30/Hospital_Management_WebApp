import { UseTemplateTableComponent } from './allmodule/pages/sales/use-templatetable.component/use-templatetable.component'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './allmodule/interceptor/interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MaterialExampleModule } from './material.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {  MatSidenavModule} from '@angular/material/sidenav';
import { MatDialogRef } from '@angular/material/dialog';
import { NumberToWordsService } from './allmodule/pages/sales/number-to-words.service';
import { PagesModule } from './allmodule/pages/pages.module';
import { ExpensesComponent } from './allmodule/pages/expenses/expenses.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule for icons
// import { UseTemplateTableComponent } from '../app/allmodule/pages/sales/use-templatetable.component/use-templatetable.component';


//import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Optional import for button styling (if needed)
import { MatButtonModule } from '@angular/material/button';



import { SettingsService } from './allmodule/services/api_services/settings.service';
import { SettingsModule } from './allmodule/settings/settings.module';

@NgModule({
  declarations: [
    AppComponent,
    UseTemplateTableComponent,
    
  ],
  imports: [

    CommonModule,
    MatIconModule, // Import MatIconModule for icons
    MatButtonModule,


    MatSnackBarModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    PagesModule,
    MaterialExampleModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    SettingsModule,

    ToastrModule.forRoot(),

    
    
    
    

    
  


  ],
  providers: [SettingsService, {provide: HTTP_INTERCEPTORS,useClass: Interceptor,multi: true },
  {​provide:LocationStrategy,useClass:HashLocationStrategy}​,
  {provide: MatDialogRef, useValue: {}}
],
  bootstrap: [AppComponent],
  
})
export class AppModule { }