import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/app/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Other Common Imports For Every Component as per need
import { MatIconModule } from '@angular/material/icon';
// import { NgxPaginationModule } from 'ngx-pagination';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';



// Dashboard Component Starts...
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
// Dashboard Component Ends...

// User Component Starts...
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { AddRoleComponent } from './user/add-role/add-role.component';
import { UsersRoleComponent } from './user/users-role/users-role.component';
import { DeleteRoleComponent } from './user/delete-role/delete-role.component';
import { ViewRoleComponent } from './user/view-role/view-role.component';
import { EditRoleComponent } from './user/edit-role/edit-role.component';
// User Component Ends...


// Suppliers Component Starts...
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './suppliers/edit-supplier/edit-supplier.component';
import { ViewSupplierComponent } from './suppliers/view-supplier/view-supplier.component';
import { DeleteSupplierComponent } from './suppliers/delete-supplier/delete-supplier.component';

// Suppiers component Ends...


// Customer Component Starts...
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { DeleteCustomerComponent } from './customers/delete-customer/delete-customer.component';
import {  CustomerCategoryComponent } from './customers/customer-category/customer-category.component';
import {  AddCustomerCategoryComponent } from './customers/customer-category/add-customer-category/add-customer-category.component';
import { EditCustomerCategoryComponent } from './customers/customer-category/edit-customer-category/edit-customer-category.component';
import {ViewCustomerCategoryComponent  } from './customers/customer-category/view-customer-category/view-customer-category.component';
// Customer Component Ends...


// Products Component Starts...
import { ProductsComponent } from './products/products.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';

import { ViewProductComponent } from './products/view-product/view-product.component';
import { AddProductBrandComponent } from './products/product-brand/add-product-brand/add-product-brand.component';
import { DeleteProductBrandComponent } from './products/product-brand/delete-product-brand/delete-product-brand.component';
import { EditProductBrandComponent } from './products/product-brand/edit-product-brand/edit-product-brand.component';
import { ProductBrandComponent } from './products/product-brand/product-brand.component';
import { ViewProductBrandComponent } from './products/product-brand/view-product-brand/view-product-brand.component';
import { ProductCategoryComponent } from './products/product-category/product-category.component';
import { AddProductCategoryComponent } from './products/product-category/add-product-category/add-product-category.component';
import { EditProductCategoryComponent } from './products/product-category/edit-product-category/edit-product-category.component';
import { ViewProductCategoryComponent } from './products/product-category/view-product-category/view-product-category.component';
import { DeleteProductCategoryComponent } from './products/product-category/delete-product-category/delete-product-category.component';
// Purchase Component Starts...

import { ShareComponent } from './suppliers/purchase-document/share/share.component';
import { PurchasesComponent } from './purchases/purchases.component';




import { PurchaseHistoryComponent } from './products/purchase-history/purchase-history.component';

import { AddPurchaseOrderComponent } from './purchases/add-purchase-order/add-purchase-order.component';






import { AddPurchasesTabComponent } from './purchases/add-purchases-tab/add-purchases-tab.component';
import { PurchasesReturnsTabComponent } from './purchases/purchases-returns-tab/purchases-returns-tab.component';
// Purchase Component Ends...


// Sales Component Starts...
import { SalesComponent } from './sales/sales.component';
import { AddQuotationComponent } from './sales/add-quotation/add-quotation.component';
import { LowStockSalesComponent } from './sales/low-stock-sales/low-stock-sales.component';
import { ExpiredProductSalesComponent } from './sales/expired-product-sales/expired-product-sales.component';
import { NearExpireProductSalesComponent } from './sales/near-expire-product-sales/near-expire-product-sales.component';
import { PosComponent } from './sales/pos/pos.component';
import { SaleReturnComponent } from './sales/sale-return/sale-return.component';
import { AddNewPositionDeleteComponent } from './sales/add-new-position-delete/add-new-position-delete.component';
import { AddNewPositionFinalisePaymentComponent } from './sales/add-new-position-finalise-payment/add-new-position-finalise-payment.component';
import { AddQuotationSuccessComponent } from './sales/add-quotation-success/add-quotation-success.component';
import { DeletePosComponent } from './sales/delete-pos/delete-pos.component';
import { DeleteSaleReturnComponent } from './sales/delete-sale-return/delete-sale-return.component';
import { EditQuotationSuccessComponent } from './sales/edit-quotation-success/edit-quotation-success.component';
import { ExpiredStockOrderSuccessComponent } from './sales/expired-stock-order-success/expired-stock-order-success.component';
import { LowStockOrderSuccessComponent } from './sales/low-stock-order-success/low-stock-order-success.component';
import { NearExpiryStockOrderSuccessComponent } from './sales/near-expiry-stock-order-success/near-expiry-stock-order-success.component';
import { SendSmsSuccessComponent } from './sales/send-sms-success/send-sms-success.component';
import { SendSmsComponent } from './sales/send-sms/send-sms.component';
import { ShareDocumentViaEmailSuccessComponent } from './sales/share-document-via-email-success/share-document-via-email-success.component';
import { ShareDocumentViaEmailComponent } from './sales/share-document-via-email/share-document-via-email.component';
import { UseTemplateDeleteSuccessComponent } from './sales/use-template-delete-success/use-template-delete-success.component';
import { UseTemplateEditSuccessComponent } from './sales/use-template-edit-success/use-template-edit-success.component';
import { UseTemplateEditComponent } from './sales/use-template-edit/use-template-edit.component';
import { UseTemplateViewComponent } from './sales/use-template-view/use-template-view.component';
import { UseTemplateComponent } from './sales/use-template/use-template.component';
import { ViewQuotationDeleteSuccessComponent } from './sales/view-quotation-delete-success/view-quotation-delete-success.component';
import { ViewSaleReturnComponent } from './sales/view-sale-return/view-sale-return.component';
import { ViewQuotationComponent } from './sales/view-quotation/view-quotation.component';
import { QuotationDocumentsComponent } from './sales/quotation-documents/quotation-documents.component';
// Sales Component Ends...

// Expenses Component Starts...
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
import { EditExpensesComponent } from './expenses/edit-expenses/edit-expenses.component';
import { ViewExpensesComponent } from './expenses/view-expenses/view-expenses.component';
import { AddExpensesCategoryComponent } from './expenses/expenses-category/add-expenses-category/add-expenses-category.component';
import { ExpensesCategoryComponent } from './expenses/expenses-category/expenses-category.component';
import { ViewExpensesCategoryComponent } from './expenses/expenses-category/view-expenses-category/view-expenses-category.component';
import { EditExpensesCategoryComponent } from './expenses/expenses-category/edit-expenses-category/edit-expenses-category.component';
import { DeleteExpensesCategoryComponent } from './expenses/expenses-category/delete-expenses-category/delete-expenses-category.component';
// Export Component Ends...

// Reports Components Starts...
import { ReportsComponent } from './reports/reports.component';
import { ViewPurchaseOrderComponent } from './purchases/view-purchase-order/view-purchase-order.component';
import { EditPurchaseOrderComponent } from './purchases/edit-purchase-order/edit-purchase-order.component';
import { DeletePurchaseOrderComponent } from './purchases/delete-purchase-order/delete-purchase-order.component';
import { AddPurchasesComponent } from './purchases/add-purchases-tab/add-purchases/add-purchases.component';
import { DeletePurchasesComponent } from './purchases/add-purchases-tab/delete-purchases/delete-purchases.component';
import { EditPurchasesComponent } from './purchases/add-purchases-tab/edit-purchases/edit-purchases.component';
import { ViewPurchasesComponent } from './purchases/add-purchases-tab/view-purchases/view-purchases.component';
import { ViewPurchasesReturnsComponent } from './purchases/purchases-returns-tab/view-purchases-returns/view-purchases-returns.component';
import { EditPurchasesReturnsComponent } from './purchases/purchases-returns-tab/edit-purchases-returns/edit-purchases-returns.component';
import { AddPurchasesReturnsComponent } from './purchases/purchases-returns-tab/add-purchases-returns/add-purchases-returns.component';
import { DeletePurchasesReturnsComponent } from './purchases/purchases-returns-tab/delete-purchases-returns/delete-purchases-returns.component';

import { AddPurchaseOrderSubmitComponent } from './purchases/add-purchase-order-submit/add-purchase-order-submit.component';

import { UseTemplateConfirmComponent } from './sales/use-template-confirmation/use-template-confirmation.component';
import { EditQuotationComponent } from './sales/edit-quotation/edit-quotation.component';

import { DeleteExpensesComponent } from './expenses/delete-expenses/delete-expenses.component';
// Reports Components Ends...

// Reports Components Ends...
import { ToastrModule } from 'ngx-toastr';

import { AddPosProductDetailsComponent } from './sales/add-new-pos/add-pos-product-details/add-pos-product-details.component';
import { AddPosPaymentDetailsComponent } from './sales/add-new-pos/add-pos-payment-details/add-pos-payment-details.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { EditPosProductDetailsComponent } from './sales/edit-pos/edit-pos-product-details/edit-pos-product-details.component';
import { EditPosPaymentDetailsComponent } from './sales/edit-pos/edit-pos-payment-details/edit-pos-payment-details.component';
import { DeleteCustomerCategoryComponent } from './customers/customer-category/delete-customer-category/delete-customer-category.component';
import { AddQuotationTemplateComponent } from './sales/add-quotation-template/add-quotation-template.component';
import { QuotationTemplateComponent } from './sales/quotation-template/quotation-template.component';
import { QuotationTemplateViewComponent } from './sales/quotation-template-view/quotation-template-view.component';
import { QuotationTemplateEditComponent } from './sales/quotation-template-edit/quotation-template-edit.component';
import { ViewPosProductdetailsComponent } from './sales/view-pos/view-pos-productdetails/view-pos-productdetails.component';
import { ViewPosPaymentdetailsComponent } from './sales/view-pos/view-pos-paymentdetails/view-pos-paymentdetails.component';
import { AddSaleReturnProductDetailsComponent } from './sales/add-sale-returns/add-sale-return-product-details/add-sale-return-product-details.component';
import { AddSaleReturnPaymentDetailsComponent } from './sales/add-sale-returns/add-sale-return-payment-details/add-sale-return-payment-details.component';
import { EditSaleReturnProductDetailsComponent } from './sales/edit-sale-returns/edit-sale-return-product-details/edit-sale-return-product-details.component';
import { EditSaleReturnsPaymentDetailsComponent } from './sales/edit-sale-returns/edit-sale-returns-payment-details/edit-sale-returns-payment-details.component';
import { ViewSaleReturnsProductDetailsComponent } from './sales/view-sale-returns/view-sale-returns-product-details/view-sale-returns-product-details.component';
import { ViewSaleReturnsPaymentDetailsComponent } from './sales/view-sale-returns/view-sale-returns-payment-details/view-sale-returns-payment-details.component';
import { AddPurchaseReturnProductDetailsComponent } from './purchases/purchases-returns-tab/add-purchase-returns/add-purchase-return-product-details/add-purchase-return-product-details.component';
import { AddPurchaseReturnPaymentDetailsComponent } from './purchases/purchases-returns-tab/add-purchase-returns/add-purchase-return-payment-details/add-purchase-return-payment-details.component';
import { EditPurchaseReturnProductDetailsComponent } from './purchases/purchases-returns-tab/edit-purchase-returns/edit-purchase-return-product-details/edit-purchase-return-product-details.component';
import { EditPurchaseReturnPaymentDetailsComponent } from './purchases/purchases-returns-tab/edit-purchase-returns/edit-purchase-return-payment-details/edit-purchase-return-payment-details.component';
import { ViewPurchaseReturnsProductDetailsComponent } from './purchases/purchases-returns-tab/view-purchase-returns/view-purchase-returns-product-details/view-purchase-returns-product-details.component';
import { ViewPurchaseReturnsPaymentDetailsComponent } from './purchases/purchases-returns-tab/view-purchase-returns/view-purchase-returns-payment-details/view-purchase-returns-payment-details.component';
import { AddPurchaseProductDetailsComponent } from './purchases/add-purchases-tab/add-new-purchase/add-purchase-product-details/add-purchase-product-details.component';
import { AddPurchasePaymentDetailsComponent } from './purchases/add-purchases-tab/add-new-purchase/add-purchase-payment-details/add-purchase-payment-details.component';
import { EditPurchaseProductDetailsComponent } from './purchases/add-purchases-tab/edit-purchase/edit-purchase-product-details/edit-purchase-product-details.component';
import { EditPurchasePaymentDetailsComponent } from './purchases/add-purchases-tab/edit-purchase/edit-purchase-payment-details/edit-purchase-payment-details.component';
import { ViewPurchaseProductDetailsComponent } from './purchases/add-purchases-tab/view-purchase/view-purchase-product-details/view-purchase-product-details.component';
import { ViewPurchasePaymentDetailsComponent } from './purchases/add-purchases-tab/view-purchase/view-purchase-payment-details/view-purchase-payment-details.component';
import { PosTableTemplateComponent } from './sales/pos-table-template/pos-table-template.component';



@NgModule({
  declarations: [


    PagesComponent,


  // Dashboard Component Starts...
  DashboardComponent,
  HeaderComponent, 
  FooterComponent,
  SidebarComponent, 
  // Dashboard Component Ends...


  // User Component Starts...
  UserComponent, 
  AddUserComponent, 
  EditUserComponent, 
  DeleteUserComponent, 
  ViewUserComponent, 
  UsersRoleComponent,
  AddRoleComponent, 
  DeleteRoleComponent, 
  ViewRoleComponent, 
  EditRoleComponent,
  // User Component Ends... 


  // Customer Component Starts... 
  CustomersComponent,
  AddCustomerComponent,
  EditCustomerComponent,
  ViewCustomerComponent,
  DeleteCustomerComponent,
  CustomerCategoryComponent,
  AddCustomerCategoryComponent,
  EditCustomerCategoryComponent,
  ViewCustomerCategoryComponent,
  DeleteCustomerCategoryComponent,
  // Customerr Component Ends...


  // Expenses Component Starts... 
  ExpensesComponent,
  AddExpensesCategoryComponent, 
  EditExpensesComponent,
  ViewExpensesCategoryComponent,
  EditExpensesCategoryComponent,
  AddExpensesComponent,
  ViewExpensesComponent,
  DeleteExpensesCategoryComponent,
  // Ends: Expenses component ends here.


  // Products component Starts here...
  ProductsComponent,
  DeleteProductComponent, 
  AddProductComponent, 
  EditProductComponent, 
  ViewProductComponent,
  ProductBrandComponent,
  ProductCategoryComponent,
  AddProductBrandComponent,
  EditProductBrandComponent,
  ViewProductBrandComponent,
  DeleteProductBrandComponent,
  AddProductCategoryComponent,
  EditProductCategoryComponent,
  ViewProductCategoryComponent,
  DeleteProductCategoryComponent,
  // Products component Ends here...


  // Supplier Component Starts...
  SuppliersComponent, 
  AddSupplierComponent, 
  ViewSupplierComponent, 
  DeleteSupplierComponent, 
  EditSupplierComponent,
  // Supplier Component Ends...


  // Purchase Component Starts...
  
  AddPurchaseOrderComponent,
  PurchasesComponent,
  ViewPurchaseOrderComponent,
  EditPurchaseOrderComponent,
  DeletePurchaseOrderComponent,
  AddPurchasesTabComponent,
  AddPurchasesComponent,
  DeletePurchasesComponent,
  EditPurchasesComponent,
  ViewPurchasesComponent,
 
   
  ShareComponent,
  PurchaseHistoryComponent, 
 
  ViewPurchasesReturnsComponent,
  EditPurchasesReturnsComponent,
  AddPurchasesReturnsComponent,
  DeletePurchasesReturnsComponent,
  PurchasesReturnsTabComponent,
  // Purchase Component Ends...

  // Sales Component Starts...
  SalesComponent,
  ViewQuotationComponent,
  QuotationDocumentsComponent,
  AddQuotationComponent,  
  AddPosProductDetailsComponent,
  AddPosPaymentDetailsComponent,
  LowStockSalesComponent, 
  ExpiredProductSalesComponent, 
  NearExpireProductSalesComponent, 
  QuotationTemplateComponent,
 AddQuotationTemplateComponent,
 EditQuotationComponent,
QuotationTemplateViewComponent,
QuotationTemplateEditComponent,

  PosComponent,
  EditPosProductDetailsComponent,
  EditPosPaymentDetailsComponent,
  ViewPosProductdetailsComponent,
  ViewPosPaymentdetailsComponent,
  SaleReturnComponent,
  UseTemplateViewComponent,
  UseTemplateEditComponent,
  SendSmsComponent,
  AddNewPositionFinalisePaymentComponent,
  AddNewPositionDeleteComponent,
  AddQuotationSuccessComponent,
  DeletePosComponent,
  DeleteSaleReturnComponent,
  EditQuotationSuccessComponent,
  ExpiredStockOrderSuccessComponent,
  LowStockOrderSuccessComponent,
  NearExpiryStockOrderSuccessComponent,
  SendSmsSuccessComponent,
  ShareDocumentViaEmailSuccessComponent,
  ShareDocumentViaEmailComponent,
  UseTemplateDeleteSuccessComponent,
  UseTemplateEditSuccessComponent,
  UseTemplateComponent,
  UseTemplateConfirmComponent,
  ViewSaleReturnComponent,
  AddSaleReturnProductDetailsComponent,
  AddSaleReturnPaymentDetailsComponent,
  EditSaleReturnProductDetailsComponent,
  EditSaleReturnsPaymentDetailsComponent,
  ViewQuotationDeleteSuccessComponent,
 
  // Sales Component Ends...

  // Expenses Component Starts...
     ExpensesCategoryComponent,
  // Expenses Component Ends...


  // Reports Component Starts...
     ReportsComponent,
  
  AddPurchaseOrderSubmitComponent,
      DeleteExpensesComponent,
      ViewSaleReturnsProductDetailsComponent,
      ViewSaleReturnsPaymentDetailsComponent,
      AddPurchaseReturnProductDetailsComponent,
      AddPurchaseReturnPaymentDetailsComponent,
      EditPurchaseReturnProductDetailsComponent,
      EditPurchaseReturnPaymentDetailsComponent,
      ViewPurchaseReturnsProductDetailsComponent,
      ViewPurchaseReturnsPaymentDetailsComponent,
      AddPurchaseProductDetailsComponent,
      AddPurchasePaymentDetailsComponent,
      EditPurchaseProductDetailsComponent,
      EditPurchasePaymentDetailsComponent,
      ViewPurchaseProductDetailsComponent,
      ViewPurchasePaymentDetailsComponent,
      PosTableTemplateComponent,
     
   
  // Reports Component Ends...
 
    

      

  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    BrowserAnimationsModule,
    MatIconModule,
    PagesRoutingModule,
    NgApexchartsModule,
    
    MatMenuModule,
    MatTableModule,

    // NgxPaginationModule,
    ToastrModule.forRoot({
      //  timeOut: 3000,
       //positionClass: 'toast-bottom-right',
      //  preventDuplicates: true,
      })
  ],
  bootstrap: [DeleteUserComponent],
})
export class PagesModule { }
