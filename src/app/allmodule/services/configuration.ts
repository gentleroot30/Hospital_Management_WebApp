// import { AddSupplierComponent } from "../pages/suppliers/add-supplier/add-supplier.component";

const BASE_URL = 'https://localhost:44379/api';

export const API_ENDPOINTS = {
  //Start: Users Role API Endpoints
  getUserRole:`${BASE_URL}/Role/GetRoles`,
  getUserRoleById:`${BASE_URL}/Role/GetRoleById`,
  getRoleFeatures:`${BASE_URL}/Role/GetRoleFeatures`,
  addRole:`${BASE_URL}/Role/AddRole`,
  updateRole:`${BASE_URL}/Role/UpdateRole`,
  deleteRole:`${BASE_URL}/Role/DeleteRole`,
  getAllFeaures:`${BASE_URL}/Feature/GetAllFeatures`,
// End: User Role API endpoints

//Start: Users API Endpoints
  addUser:`${BASE_URL}/User/AddUser`,
  updateUser:`${BASE_URL}/User/UpdateUser`,
  deleteUser: `${BASE_URL}/User/DeleteUser`,
  getUsers: `${BASE_URL}/User/GetUsers`,
  getUserbyId:`${BASE_URL}/User/GetUserById`,
  //End : User API endpoints.


//Start: Customer category API Endpoints
addCustomerCategory:`${BASE_URL}/CustomerCategory/AddCustomerCategoy`,
getCustomerCategoryById:`${BASE_URL}/CustomerCategory/GetCustomerCategoryById`,
updateCustomerCategory:`${BASE_URL}/CustomerCategory/UpdateCustomerCategory`,
deleteCustomerCategory:`${BASE_URL}/CustomerCategory/DeleteCustomerCategory`,
searchCustomerCategory:`${BASE_URL}/CustomerCategory/GetCustomercategories`,
  //End : Customer category API endpoints.

  //start: customer API endpoints
  getCustomerById:`${BASE_URL}/Customer/GetCustomerById`,
  addCustomer:`${BASE_URL}/Customer/AddCustomer`,
  editCustomer:`${BASE_URL}/Customer/UpdateCustomer`,
  deleteCustomer:`${BASE_URL}/Customer/DeleteCustomer`,
  searchCustomer:`${BASE_URL}/Customer/GetCustomers`,
  //end: customer API endpoints


//Start: Quotation template API endpoints
addQuotationTemplate:`${BASE_URL}/QuotationTemplate/AddQuotationTemplate`,
editQuotationTemplate:`${BASE_URL}/QuotationTemplate/UpdateQuotationTemplate`,
getQuotationTemplate:`${BASE_URL}/QuotationTemplate/GetQuotationTemplateById`,
searchQuotationTemplate:`${BASE_URL}/QuotationTemplate/GetQuotationTemplate`,
deleteQuotationTemplate:`${BASE_URL}/QuotationTemplate/DeleteQuotationTemplate`,
productList:`${BASE_URL}/Product/GetProducts`,
//End Quotation template API endpoints.

//Start: Purchase API endpoints
getPurchaseById:`${BASE_URL}/Purchase/GetPurchaseById`,
getPurchase:`${BASE_URL}/Purchase/GetPurchases`,
addNewPurchase:`${BASE_URL}/Purchase/AddPurchase`,
updatePurchase:`${BASE_URL}/Purchase/UpdatePurchase`,
uploadPurchaseDocuments:`${BASE_URL}/PurchaseDocument/UploadPurchaseDocument`,
deletePurchaseDocuments:`${BASE_URL}/PurchaseDocument/DeletePurchaseDocument`,

//end: Purchase API Endpoints

//Start:Purchase order API endpoints
getPurchaseOrder:`${BASE_URL}/PurchaseOrder/GetPurchaseOrders`,
deletePurchaseOrder:`${BASE_URL}/PurchaseOrder/DeletePurchaseOrder`,
addPurchaseOrder:`${BASE_URL}/PurchaseOrder/AddPurchaseOrder`,
updatePurchaseOrder:`${BASE_URL}/PurchaseOrder/UpdatePurchaseOrder`,
getPurchaseOrderById:`${BASE_URL}/PurchaseOrder/GetPurchaseOrderById`,

//End:Purchase order API endpoints



//Start: Purchase Return API endpoints.
addPurchaseReturn:`${BASE_URL}/PurchaseReturn/AddPurchaseReturn`,
searchPurchaseReturns:`${BASE_URL}/PurchaseReturn/GetPurchaseReturns`,
updatePurchaseReturn:`${BASE_URL}/PurchaseReturn/UpdatePurchaseReturn`,
deletePurchaseReturn:`${BASE_URL}/PurchaseReturn/DeletePurchaseReturn`,
getPurchaseReturnById:`${BASE_URL}/PurchaseReturn/getPurchaseReturnById`,
getPurchaseByProductIdAndSupplierId:`${BASE_URL}/Purchase/GetPurchaseByProductIdAndSupplierId`,
getProductBySupplierId:`${BASE_URL}/Product/GetProductBySupplierId`,
//end: Purchase Return API Endpoints

//Start: Quotation  API endpoints
getQuotations:`${BASE_URL}/Quotation/GetQuotations`,
deleteQuotation:`${BASE_URL}/Quotation/DeleteQuotation`,
addQuotation:`${BASE_URL}/Quotation/AddQuotation`,
getQuotationByID:`${BASE_URL}/Quotation/GetQuotationById`,
updateQuotation:`${BASE_URL}/Quotation/UpdateQuotation`,
uploadQuotationDocuments:`${BASE_URL}/QuotationDocument/UploadQuotationDocument`,
deleteQuotationDocuments:`${BASE_URL}/QuotationDocument/DeleteQuotationDocument`,
downloadQutationDocuments:`${BASE_URL}/QuotationDocument/DownloadQuotationDocument`,


//End : Quotation API endpoints.


//Start: Supplier API Endpoints
addSupplier:`${BASE_URL}/Supplier/AddSupplier`,
getSuppliers:`${BASE_URL}/Supplier/GetSupplierById`,
editSupplier:`${BASE_URL}/Supplier/UpdateSupplier`,
deleteSupplier:`${BASE_URL}/Supplier/DeleteSupplier`,
searchSupplier:`${BASE_URL}/Supplier/GetSuppliers`,
//end: Supplier API endpoints


 //Start: Expense category API Endpoints
 addExpensesCategory:`${BASE_URL}/ExpenseCategory/AddExpenseCategory`,
 getExpensesCategoryById:`${BASE_URL}/ExpenseCategory/GetExpenseCategoryById`,
 updateExpensesCategory:`${BASE_URL}/ExpenseCategory/UpdateExpenseCategory`,
 deleteExpensesCategory:`${BASE_URL}/ExpenseCategory/DeleteExpenseCategory`,
 searchExpensesCategory:`${BASE_URL}/ExpenseCategory/GetExpenseCategories`,
   //End : Expense category API endpoints. 

   //Start: Expense API Endpoints
 addExpenses:`${BASE_URL}/Expense/AddExpense`,
 getExpensesById:`${BASE_URL}/Expense/GetExpensesById`,
 updateExpenses:`${BASE_URL}/Expense/UpdateExpense`,
 deleteExpenses:`${BASE_URL}/Expense/DeleteExpense`,
 searchExpenses:`${BASE_URL}/Expense/GetExpenses`,
   //End : Expense API endpoints. 


//Start: Product API Endpoints
addProduct:`${BASE_URL}/Product/AddProduct`,
getProduct:`${BASE_URL}/Product/GetProductById`,
editProduct:`${BASE_URL}/Product/UpdateProduct`,
deleteProduct:`${BASE_URL}/Product/DeleteProduct`,
searchProduct:`${BASE_URL}/Product/GetProducts`,
getPurchaseHistory:`${BASE_URL}/Product/GetPurchaseHistoryByProductId`,
//end: Product API endpoints

//Start: Product category API Endpoints
addProductCategory:`${BASE_URL}/ProductCategory/AddProductCategory`,
updateProductCategory:`${BASE_URL}/ProductCategory/UpdateProductCategory`,
getProductCategoryById:`${BASE_URL}ProductCategory/GetProductCategoryById`,
getProductCategory:`${BASE_URL}ProductCategory/GetProductCategories`,
deleteProductCategory:`${BASE_URL}ProductCategory/DeleteProductCategory`,
//End:Product category API Endpoints


// Start: Product-Brand API Endpoints
addProductBrand:`${BASE_URL}/Brand/AddBrand`,
getBrandById:`${BASE_URL}/Brand/GetBrandByID`,
getBrands:`${BASE_URL}/Brand/GetBrands`,
editBrand:`${BASE_URL}/Brand/UpdateBrand`,
deleteBrand:`${BASE_URL}/Brand/DeleteBrand`,
searchProductBrand:`${BASE_URL}/Brand/GetBrands`,
//end: Product-Brand API Endpoints




// start: POS API endponints.
searchPos: `${BASE_URL}/POS/GetPOS`,
getPosById: `${BASE_URL}/POS/GetPOSById`,
updatePos: `${BASE_URL}/POS/UpdatePOS`,
addPos: `${BASE_URL}/POS/AddPOS`,
deletePos: `${BASE_URL}/POS/DeleteSales`,
getBatchesByProductId:`${BASE_URL}/Product/GetBatchesByProductId`,
//end:POS endpoints.


//Start: sale-return API endpoints
getSalesReturns: `${BASE_URL}/SalesReturn/GetSalesRetruns`,
getSalesReturnById:`${BASE_URL}/SalesReturn/GetSalesReturnById`,
editSalesReturn:`${BASE_URL}/SalesReturn/UpdateSalesReturn`,
addSalesReturns:`${BASE_URL}/SalesReturn/AddSalesReturn`,
deleteSalesReturns:`${BASE_URL}/SalesReturn/DeleteSalesReturn`,
getSalesByProductIdAndCustomerId:`${BASE_URL}/Sale/GetSalesByProductIdAndCustomerId`,
getProductByCustomerId:`${BASE_URL}/Product/GetProductByCustomerId`,
//End: sale-return API endpoints.


//start exipre product
getExpiredProducts:`${BASE_URL}/POS/getExpiredProducts`,
getLowerProducts:`${BASE_URL}/POS/getLowerProducts`,
getNearExpireryProducts:`${BASE_URL}/POS/getNearExpireryProducts`,
//end expire product 

// start import stock component
uploadImportStock: `${BASE_URL}/AccountSettings/UploadImportStockFile`,
// end import stock component


//start: settings API endpoints.
uploadHeader: `${BASE_URL}/AccountSettings/UploadHeader`,
uploadFooter: `${BASE_URL}/AccountSettings/UploadFooter`,
uploadProfilePhoto: `${BASE_URL}/AccountSettings/UploadProfilePhoto`
//end: settings API endpoints.
};


 