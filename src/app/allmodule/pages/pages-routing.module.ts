import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { PurchaseHistoryComponent } from './products/purchase-history/purchase-history.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { DeleteSupplierComponent } from './suppliers/delete-supplier/delete-supplier.component';
import { EditSupplierComponent } from './suppliers/edit-supplier/edit-supplier.component';

import { SuppliersComponent } from './suppliers/suppliers.component';
import { ViewSupplierComponent } from './suppliers/view-supplier/view-supplier.component';
import { AddRoleComponent } from './user/add-role/add-role.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DeleteRoleComponent } from './user/delete-role/delete-role.component';
import { EditRoleComponent } from './user/edit-role/edit-role.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserComponent } from './user/user.component';
import { ViewRoleComponent } from './user/view-role/view-role.component';
import { ViewUserComponent } from './user/view-user/view-user.component';


import { SalesComponent } from './sales/sales.component';
import { CustomersComponent } from './customers/customers.component';
import { AddQuotationTemplateComponent } from './sales/add-quotation-template/add-quotation-template.component';
import { AddQuotationComponent } from './sales/add-quotation/add-quotation.component';
import { QuotationTemplateComponent } from './sales/quotation-template/quotation-template.component';
import { ReportsComponent } from './reports/reports.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';

import { ExpiredProductSalesComponent } from './sales/expired-product-sales/expired-product-sales.component';
import { NearExpireProductSalesComponent } from './sales/near-expire-product-sales/near-expire-product-sales.component';
import { LowStockSalesComponent } from './sales/low-stock-sales/low-stock-sales.component';

import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { DeleteCustomerComponent } from './customers/delete-customer/delete-customer.component';


import { AddPurchaseOrderComponent } from './purchases/add-purchase-order/add-purchase-order.component';
import { ViewExpensesCategoryComponent } from './expenses/expenses-category/view-expenses-category/view-expenses-category.component';
import { EditExpensesComponent } from './expenses/edit-expenses/edit-expenses.component';
import { ViewExpensesComponent } from './expenses/view-expenses/view-expenses.component';
import { AddExpensesCategoryComponent } from './expenses/expenses-category/add-expenses-category/add-expenses-category.component';

import { PosComponent } from './sales/pos/pos.component';
import { SaleReturnComponent } from './sales/sale-return/sale-return.component';

import { CustomerCategoryComponent } from './customers/customer-category/customer-category.component';
import { AddCustomerCategoryComponent } from './customers/customer-category/add-customer-category/add-customer-category.component';
import { EditCustomerCategoryComponent } from './customers/customer-category/edit-customer-category/edit-customer-category.component';
import { ViewCustomerCategoryComponent } from './customers/customer-category/view-customer-category/view-customer-category.component';
import { ProductBrandComponent } from './products/product-brand/product-brand.component';
import { AddProductBrandComponent } from './products/product-brand/add-product-brand/add-product-brand.component';
import { EditProductBrandComponent } from './products/product-brand/edit-product-brand/edit-product-brand.component';
import { ViewProductBrandComponent } from './products/product-brand/view-product-brand/view-product-brand.component';
import { DeleteProductBrandComponent } from './products/product-brand/delete-product-brand/delete-product-brand.component';
import { ExpensesCategoryComponent } from './expenses/expenses-category/expenses-category.component';
import { UsersRoleComponent } from './user/users-role/users-role.component';
import { AddPurchasesTabComponent } from './purchases/add-purchases-tab/add-purchases-tab.component';
import { PurchasesReturnsTabComponent } from './purchases/purchases-returns-tab/purchases-returns-tab.component';
import { AddProductCategoryComponent } from './products/product-category/add-product-category/add-product-category.component';
import { DeleteProductCategoryComponent } from './products/product-category/delete-product-category/delete-product-category.component';
import { EditProductCategoryComponent } from './products/product-category/edit-product-category/edit-product-category.component';
import { ViewProductCategoryComponent } from './products/product-category/view-product-category/view-product-category.component';
import { ProductCategoryComponent } from './products/product-category/product-category.component';

import { QuotationDocumentsComponent } from './sales/quotation-documents/quotation-documents.component';
import { ViewQuotationComponent } from './sales/view-quotation/view-quotation.component';
import { ViewPurchaseOrderComponent } from './purchases/view-purchase-order/view-purchase-order.component';
import { EditPurchaseOrderComponent } from './purchases/edit-purchase-order/edit-purchase-order.component';
import { DeletePurchaseOrderComponent } from './purchases/delete-purchase-order/delete-purchase-order.component';
import { AddPurchasesComponent } from './purchases/add-purchases-tab/add-purchases/add-purchases.component';
import { DeletePurchasesComponent } from './purchases/add-purchases-tab/delete-purchases/delete-purchases.component';
import { EditPurchasesComponent } from './purchases/add-purchases-tab/edit-purchases/edit-purchases.component';
import { ViewPurchasesComponent } from './purchases/add-purchases-tab/view-purchases/view-purchases.component';
import { EditPurchasesReturnsComponent } from './purchases/purchases-returns-tab/edit-purchases-returns/edit-purchases-returns.component';
import { AddPurchasesReturnsComponent } from './purchases/purchases-returns-tab/add-purchases-returns/add-purchases-returns.component';
import { DeletePurchasesReturnsComponent } from './purchases/purchases-returns-tab/delete-purchases-returns/delete-purchases-returns.component';
import { AddPurchaseOrderSubmitComponent } from './purchases/add-purchase-order-submit/add-purchase-order-submit.component';
import { ViewPurchasesReturnsComponent } from './purchases/purchases-returns-tab/view-purchases-returns/view-purchases-returns.component';
import { QuotationTemplateEditComponent } from './sales/quotation-template-edit/quotation-template-edit.component';
import { QuotationTemplateViewComponent } from './sales/quotation-template-view/quotation-template-view.component';
import { UseTemplateComponent } from './sales/use-template/use-template.component';
import { EditQuotationComponent } from './sales/edit-quotation/edit-quotation.component';
import { AddPosProductDetailsComponent } from './sales/add-new-pos/add-pos-product-details/add-pos-product-details.component';
import { AddPosPaymentDetailsComponent } from './sales/add-new-pos/add-pos-payment-details/add-pos-payment-details.component';
import { EditPosProductDetailsComponent } from './sales/edit-pos/edit-pos-product-details/edit-pos-product-details.component';
import { EditPosPaymentDetailsComponent } from './sales/edit-pos/edit-pos-payment-details/edit-pos-payment-details.component';
import { ViewPosPaymentdetailsComponent } from './sales/view-pos/view-pos-paymentdetails/view-pos-paymentdetails.component';
import { ViewPosProductdetailsComponent } from './sales/view-pos/view-pos-productdetails/view-pos-productdetails.component';
import { AddSaleReturnProductDetailsComponent } from './sales/add-sale-returns/add-sale-return-product-details/add-sale-return-product-details.component';
import { AddSaleReturnPaymentDetailsComponent } from './sales/add-sale-returns/add-sale-return-payment-details/add-sale-return-payment-details.component';
import { EditSaleReturnsPaymentDetailsComponent } from './sales/edit-sale-returns/edit-sale-returns-payment-details/edit-sale-returns-payment-details.component';
import { EditSaleReturnProductDetailsComponent } from './sales/edit-sale-returns/edit-sale-return-product-details/edit-sale-return-product-details.component';
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

const routes: Routes = [
  { path:'', component:PagesComponent,children:[


  // Dashboard component Starts here...
  { path:'dashboard',component:DashboardComponent },
  // Dashboard component Ends here...


  // User component Starts here...
  {path:'user',component:UserComponent },
  {path:'UsersRoleComponent',component:UsersRoleComponent} ,
  {path:'add-user', component:AddUserComponent },
  {path:'edit-user', component: EditUserComponent },
  {path:'view-user', component: ViewUserComponent },
  {path:'add-role', component:AddRoleComponent},
  {path:'view-role', component:ViewRoleComponent},
  {path:'edit-role',component:EditRoleComponent},
  {path:'delete-role', component:DeleteRoleComponent},
  // User component Ends here...


  // Suppliers component Starts here...
  {path:'supplier', component:SuppliersComponent},
  {path:'add-supplier',component:AddSupplierComponent},
  {path:'view-supplier', component:ViewSupplierComponent},
  {path:'edit-supplier', component:EditSupplierComponent},
  {path:'delete-supplier', component:DeleteSupplierComponent},
  // Supplier component Ends here...


  // Customer component Starts here... 
  {path:'customers',component:CustomersComponent},
  {path:'add-customer',component:AddCustomerComponent},
  {path:'view-customer',component:ViewCustomerComponent},
  {path:'edit-customer',component:EditCustomerComponent},
  {path:'delete-customer',component:DeleteCustomerComponent},
  {path:'add-customer-category',component:AddCustomerCategoryComponent},
  {path:'edit-customer-category',component:EditCustomerCategoryComponent},
  {path:'view-customer-category',component:ViewCustomerCategoryComponent},
  {path:'customer-category',component:CustomerCategoryComponent},
  // Customer component Ends here...


  // Products component Starts here..
  {path:'product',component:ProductsComponent},
  {path:'add-product', component:AddProductComponent },
  {path:'edit-product', component: EditProductComponent },
  {path:'view-product', component: ViewProductComponent },
  {path:'product-brand',component:ProductBrandComponent},
  {path:'add-product-brand',component:AddProductBrandComponent},
  {path:'edit-product-brand',component:EditProductBrandComponent},
  {path:'view-product-brand',component:ViewProductBrandComponent},
  {path:'delete-product-brand',component:DeleteProductBrandComponent}, 
  {path:'product-category', component: ProductCategoryComponent },
  {path:'add-product-category', component: AddProductCategoryComponent },
  {path:'edit-product-category', component: EditProductCategoryComponent },
  {path:'view-product-category', component: ViewProductCategoryComponent } ,
  {path:'delete-product-category', component: DeleteProductCategoryComponent},
  //Products Component Ends here...


  // Purchase Component Start here...
  
  {path:'purchase', component: PurchasesComponent},
  
  
  
  {path:'view-purchase-order',component:ViewPurchaseOrderComponent},
  {path:'edit-purchase-order',component:EditPurchaseOrderComponent},
  {path:'delete-purchase-order',component:DeletePurchaseOrderComponent},
  {path:'add-purchases',component:AddPurchasesComponent},
  {path:'add-purchase-product-details',component:AddPurchaseProductDetailsComponent},
  {path:'add-purchases-payment-details',component:AddPurchasePaymentDetailsComponent},

  {path:'delete-purchases',component:DeletePurchasesComponent},
  {path:'edit-purchases',component:EditPurchasesComponent},
  {path:'edit-purchases-product-details',component:EditPurchaseProductDetailsComponent},
  {path:'edit-purchases-payment-details',component:EditPurchasePaymentDetailsComponent},
  {path:'view-purchases-product-details',component:ViewPurchaseProductDetailsComponent},
  {path:'view-purchases-payment-details',component:ViewPurchasePaymentDetailsComponent},
  {path:'view-purchases',component:ViewPurchasesComponent},
  {path:'purchase-history', component:PurchaseHistoryComponent},
  {path:'add-purchases-tab',component:AddPurchasesTabComponent},
 
  {path:'add-purchase-order',component:AddPurchaseOrderComponent},
 
  
  
  {path:'purchases-returns-tab',component:PurchasesReturnsTabComponent},
  {path:'add-purchases-returns',component:AddPurchasesReturnsComponent},
  {path:'add-purchase-return-product-details',component:AddPurchaseReturnProductDetailsComponent},
  {path:'add-purchase-return-payment-details',component:AddPurchaseReturnPaymentDetailsComponent},
  {path:'edit-purchase-return-product-details',component:EditPurchaseReturnProductDetailsComponent},
  {path:'edit-purchase-return-payment-details',component:EditPurchaseReturnPaymentDetailsComponent},
  {path:'view-purchase-return-product-details',component:ViewPurchaseReturnsProductDetailsComponent},
  {path:'view-purchase-return-payment-details',component:ViewPurchaseReturnsPaymentDetailsComponent},

  {path:'edit-purchases-returns',component:EditPurchasesReturnsComponent},
  {path:'view-purchases-returns',component:ViewPurchasesReturnsComponent},
  {path:'delete-purchases-returns',component:DeletePurchasesReturnsComponent},
  
  {path:'add-purchase-order-submit',component:AddPurchaseOrderSubmitComponent},


  // Purchase Component Ends here...


  // Sales Component Starts here...
  {path:'sales',component:SalesComponent},
  {path:'pos',component:PosComponent},
  {path:'sale-return',component:SaleReturnComponent},
  {path:'quotation-template',component:QuotationTemplateComponent},
  {path:'add-quotation-template',component:AddQuotationTemplateComponent},
  {path:'add-quotation',component:AddQuotationComponent},
  {path:'quotation-template',component:QuotationTemplateComponent},
  {path:'expired-product-sales',component:ExpiredProductSalesComponent},
  {path:'near-expire',component:NearExpireProductSalesComponent},
  {path:'low-stock',component:LowStockSalesComponent},
  {path:'edit-pos-product-details',component:EditPosProductDetailsComponent},
  {path:'edit-payment-details',component:EditPosPaymentDetailsComponent},
  {path:'view-pos-productdetails',component:ViewPosProductdetailsComponent},
  {path:'view-pos-paymentdetails',component:ViewPosPaymentdetailsComponent},
  {path:'add-pos-product-details',component:AddPosProductDetailsComponent},
  {path:'add-pos-payment-details',component:AddPosPaymentDetailsComponent},
  {path:'edit-pos-product-details',component:EditPosProductDetailsComponent},
  {path:'edit-pos-payment-details',component:EditPosPaymentDetailsComponent},
  {path:'add-sale-return-product-details', component:AddSaleReturnProductDetailsComponent},
  {path:'add-sale-return-payment-details',component:AddSaleReturnPaymentDetailsComponent},
  {path:'edit-sale-return-payment-details',component:EditSaleReturnsPaymentDetailsComponent},
  {path:'edit-sale-return-product-details',component:EditSaleReturnProductDetailsComponent},
  {path:'view-sale-return-product-details',component:ViewSaleReturnsProductDetailsComponent},
  {path:'view-sale-return-payment-details',component:ViewSaleReturnsPaymentDetailsComponent},
  {path:'quotation-documents',component:QuotationDocumentsComponent},
  {path:'view-quotation',component:ViewQuotationComponent},
  {path:'edit-quotation',component:EditQuotationComponent},
  {path:'edit-quotation-template',component:QuotationTemplateEditComponent},
  {path:'view-quotation-template',component:QuotationTemplateViewComponent},
  {path:'use-template',component:UseTemplateComponent},



  // Sales Component Ends here...


  // Expenses component Starts here...
  {path:'expenses',component:ExpensesComponent},
  {path:'expense',component:ExpensesComponent},
  {path:'add-expenses',component:AddExpensesComponent},
  {path:'view-expenses',component:ViewExpensesComponent},
  {path:'edit-expenses',component:EditExpensesComponent},
  {path:'expenses-category',component:ExpensesCategoryComponent},
  {path:'add-expenses-category', component:AddExpensesCategoryComponent},
  {path:'view-expenses-category',component:ViewExpensesCategoryComponent},
  // Expenses component Ends here...


  // Reports component Starts here...
  {path:'reports',component:ReportsComponent},
  // Reports component Ends here...



  

  
 






  


  
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
