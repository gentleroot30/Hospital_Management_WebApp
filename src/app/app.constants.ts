import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class Constants {

  constructor() { }

  public  SuccessMessages ={

    USER_SAVED_MESSAGE : "User saved successfully.",
 
  USER_UPDATED_MESSAGE : "User updated successfully.",
  USER_DELETED_MESSAGE : "User deleted successfully.",
 
 
  CUSTOMER_SAVED_MESSAGE : "customer saved successfully.",
  CUSTOMER_UPDATED_MESSAGE : "customer updated successfully.",
  CUSTOMER_DELETED_MESSAGE : "customer deleted successfully",
 
  BRAND_SAVED_MESSAGE : "Product Brand saved successfully",
  BRAND_UPDATED_MESSAGE : "Product brand updated successfully",
  BRAND_DELETED_MESSAGE : "Product brand deleted successfully",
 
  CUSTOMER_CATEGORY_SAVED_MESSAGE : "Customer category saved successfully.",
  CUSTOMER_CATEGORY_UPDATED_MESSAGE : " Customer category updated successfully.",
  CUSTOMER_CATEGORY_DELETED_MESSAGE : " Custommer category deleted successfully",
 
  PRODUCT_SAVED_MESSAGE : "Product saved successfully.",
  PRODUCT_UPDATED_MESSAGE : "Product updated successfully.",
  PRODUCT_DELETED_MESSAGE : "Product deleted successfully",
 
  PRODUCT_CATEGORY_SAVED_MESSAGE : "Product Category saved successfully.",
  PRODUCT_CATEGORY_UPDATED_MESSAGE : "Product Category updated successfully.",
  PRODUCT_CATEGORY_DELETED_MESSAGE : "Product Category deleted successfully",
 
  SUPPLIER_SAVED_MESSAGE : "Supplier saved successfully.",
  SUPPLIER_UPDATED_MESSAGE : "Supplier updated successfully.",
  SUPPLIER_DELETED_MESSAGE : "Supplier deleted successfully",
 
  ROLE_SAVED_MESSAGE : "Role saved successfully.",
  ROLE_UPDATED_MESSAGE : "Role updated successfully.",
  ROLE_DELETED_MESSAGE : "Role deleted successfully.",
 
 
  QUOTATION_SAVED_MESSAGE : "Quotation saved successfully.",
  QUOTATION_UPDATED_MESSAGE : "Quotation updated successfully.",
  QUOTATION_DELETED_MESSAGE : "Quotation deleted successfully.",
 
 
 
  QUOTATION_TEMPLATE_SAVED_MESSAGE : "Quotation Template saved successfully.",
  QUOTATION_TEMPLATE_UPDATED_MESSAGE : "Quotation Template updated successfully.",
  QUOTATION_TEMPLATE_DELETED_MESSAGE : "Quotation Template deleted successfully.",
 
  POS_SAVED_MESSAGE : "POS saved successfully.",
  POS_UPDATED_MESSAGE : "POS updated successfully.",
  POS_DELETED_MESSAGE : "POS deleted successfully.",
 
 
  SALESRETURN_SAVED_MESSAGE : "Sales return saved successfully.",
  SALESRETURN_UPDATED_MESSAGE : "Sales return updated successfully.",
  SALESRETURN_DELETED_MESSAGE : "POS deleted successfully.",
 
 
  EXPENSE_SAVED_MESSAGE : "Expenses saved successfully.",
  EXPENSES_UPDATED_MESSAGE : "Expenses updated successfully.",
  EXPENSES_DELETED_MESSAGE : "Expenses deleted successfully.",
 
  EXPENSE_CATEGORY_SAVED_MESSAGE : "Expense category saved successfully.",
  EXPENSE_CATEGORY_UPDATED_MESSAGE : "Expense category updated successfully.",
  EXPENSE_CATEGORY_DELETED_MESSAGE : "Expense category deleted successfully.",
 
  PURCHASE_SAVED_MESSAGE : "Purchase saved successfully.",
  PURCHASE_UPDATED_MESSAGE : "Purchase updated successfully.",
  PURCHASE_DELETED_MESSAGE : "Purchase deleted successfully.",
 
  PURCHASE_RETURN_SAVED_MESSAGE : "Purchase Return saved successfully",
  PURCHASE_RETURN_DELETED_MESSAGE : "Purchase Return deleted successfully",
  PURCHASE_RETURN_UPDATED_MESSAGE : "Purchase Return updated successfully",
 
 
  PURCHASE_ORDER_SAVED_MESSAGE : "Purchase Order saved successfully",
  PURCHASE_ORDER_UPDATED_MESSAGE : "Purchase Order Updated successfully",
  PURCHASE_ORDER_DELETED_MESSAGE : "Purchase Order Deleted successfully",
 
 
  PURCHASE_DOCUMENT_SAVED_MESSAGE : "Purchase Document Saved successfully",
  PURCHASE_DOCUMENT_DELETED_MESSAGE : "Purchase Document Deleted successfully",
 
 
  QUOTATION_DOCUMENT_SAVED_MESSAGE : "Quotation Document Saved successfully",
  QUOTATION_DOCUMENT_DELETED_MESSAGE : "Quotation Document Deleted successfully",
 
 
  PROFILE_PHOTO_SAVED_MESSAGE : "Profile Photo Saved successfully",
  PROFILE_PHOTO_DELETED_MESSAGE : "Profile Photo Deleted successfully",
 
 
  HEADER_PHOTO_SAVED_MESSAGE : "Header Photo Saved successfully",
  HEDAER_PHOTO_DELETED_MESSAGE : "Header Photo Deleted successfully",
 
 
  FOOTER_PHOTO_SAVED_MESSAGE : "Footer Photo Saved successfully",
  FOOTER_PHOTO_DELETED_MESSAGE : "Footer Photo Deleted successfully",
 
  IMPORT_STOCK_FILE_SAVED_MESSAGE : "Import Stock File Uploaded Successfully",
   }
  
    public  ErrorCodes={
   
     
                INVALID_SEARCHTYPE_ERROR_CODE : 1031,


                INVALID_LOGIN_EMAIL_ERROR_CODE : 1039,
                INVALID_PASSWORD_ERROR_CODE : 1002,

                // Start:User APIs Error Code

                FAILED_TO_FETCH_USER_DATA_CODE : 1031,
                USER_ID_DOES_NOT_EXISTS : 1034,
                NO_USER_FOUND_CODE : 1035,
                USER_NAME_CAN_NOT_BE_BLANK_CODE : 1041,
                INVALID_USER_NAME_CODE : 1038,
                USER_EMAIL_CAN_NOT_BE_BLANK_CODE : 1039,
                INVALID_USER_EMAIL_ERROR_CODE : 1040,
                INVALID_USER_ERROR_CODE : 1041,
                FAILED_TO_ADD_USER_CODE : 1042,
                FAILED_TO_UPDATE_USER_CODE : 1043,
                FAILED_DELETE_USER_CODE : 1044,

                //End: User APIs Error codes


                //Start: Role APIs Error code 

                FAILED_TO_FETCH_ROLE_DATA_ERROR_CODE : 1061,
                UNAUTHORIZED_ROLE_DATA_ACCESS_ERROR_CODE : 1062,
                ROLE_ID_DOES_NOT_EXISTS_ERROR_CODE : 1063,
                NO_ROLE_FOUND_ERROR_CODE : 1064,
                ROLE_NAME_CAN_NOT_BE_BLANK_ERROR_CODE : 1064,
                FAILED_TO_SAVE_ROLE_ERROR_CODE : 1065,
                FAILED_TO_UPDATE_ROLE_ERROR_CODE : 1066,
                FAILED_TO_DELETE_ROLE_ERROR_CODE : 1067,
                FEATURE_ID_DOES_NOT_EXISTS_ERROR_CODE : 1068,
                ROLE_EXIST_ERROR_ERROR_CODE : 1069,

                // End: Role APIs Error code


                //Start: Customer APIs Error code

                FAILED_TO_FETCH_CUSTOMER_DATA_ERROR_CODE : 1151,
                CUSTOMER_ID_DOES_NOT_EXISTS_ERROR_CODE : 1152,
                FAILED_TO_UPDATE_CUSTOMER_ERROR_CODE : 1156,
                CUSTOMER_NAME_CAN_NOT_BE_BLANK_CODE : 1153,
                CUSTOMER_NOT_DELETED_CODE : 1127,
                FAILED_TO_SAVE_CUSTOMER_ERROR_CODE : 1155,
                CATEGORY_ID_CAN_NOT_BE_BLANK_CODE : 1158,
                CUSTOMER_CODE_CAN_NOT_BE_BLANK_CODE : 1124,
                CUSTOMER_CONATCT_NO_1_CAN_NOT_BE_BLANK_CODE : 1154,
                CUSTOMER_CONATCT_NUMBER_ALREADY_EXISTS_CODE:1159,

                //End: Customer APIs Error code


                // Start: Customer category APIs Error Code

                FAILED_TO_FETCH_CUSTOMER_CATEGORY_CODE : 1121,
                CUSTOMER_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE : 1122,
                NO_CUSTOMER_CATEGORY_FOUND_ERROR_CODE : 1127,
                CUSTOMER_CATEGORY_NAME_CAN_NOT_BE_BLANK_CODE : 1123,
                FAILED_TO_SAVE_CUSTOMER_CATEGORY_ERROR_CODE : 1124,
                CUSTOMER_CATEGORY_EXIST_ERROR_CODE : 1122,
                FAILED_TO_UPDATE_CUSTOMER_CATEGORY_ERROR_CODE : 1125,
                FAILED_TO_DELETE_CUSTOMER_CATEGORY_ERROR_CODE : 1126,

                //End: Customer category APIs Error Code


                // Start: Brand API Error Code

                FAILED_TO_FETCH_BRAND_DATA_ERROR_CODE : 1241,
                FAILED_TO_UPDATE_BRAND_ERROR_CODE : 1245,
                FAILED_TO_DELETE_BRAND_ERROR_CODE : 1246,
                BRAND_NAME_ALREADY_EXIST_ERROR_CODE : 1247,
                BRAND_NAME_CAN_NOT_BE_BLANK_ERROR_CODE : 1243,
                FAILED_TO_SAVE_BRAND_ERROR_CODE : 1244,
                BRAND_ID_DOES_NOT_EXISTS_ERROR_CODE : 1242,


                // End: Brand API Error code


                //Start: Product Error Code

                FAILED_TO_FETCH_PRODUCT_DATA_ERROR_CODE : 1181,
                PRODUCT_ID_DOES_NOT_EXISTS_ERROR_CODE : 1182,
                FAILED_TO_SAVE_PRODUCT_DATA_ERROR_CODE : 1186,
                PRODUCT_NAME_CAN_NOT_BE_BLANK_ERROR_CODE : 1183,
                BRAND_ID_CAN_NOT_BE_BLANK : 1184,
                PRODUCT_CATEGORY_CAN_NOT_BE_BLANK_ERROR_CODE : 1185,
                ALERT_QUANTITY_CAN_NOT_BE_BLANK_ERROR_CODE : 1189,
                FAILED_TO_UPDATE_PRODUCT_DATA_ERROR_CODE : 1187,
                FAILED_TO_DELETE_PRODUCT_DATA_ERROR_CODE : 1188,

                //End: Product Error Code


                // Start: Product Category Error Code

                FAILED_TO_FETCH_PRODUCT_CATEGORY_DATA_ERROR_CODE : 1211,
                PRODUCT_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE : 1212,
                PRODUCT_CATEGORY_NAME_CAN_NOT_BE_BLANK_ERROR_CODE : 1213,
                PRODUCT_CATEGORY_EXIST_ERROR_CODE : 1214,
                FAILED_TO_SAVE_PRODUCT_CATEGORY_CODE : 1215,
                FAILED_TO_UPDATE_PRODUCT_CATEGORY_CODE : 1216,
                PRODUCT_CATEGORY_NOT_DELETED_CODE : 1217,

                // End: Product Category Error Code


                //Start: Supplier API Error Code

                FAILED_TO_FETCH_SUPPLIER_DATA_ERROR_CODE : 1091,
                SUPPLIER_ID_DOES_NOT_EXISTS_ERROR_CODE : 1092,
                SUPPLIER_FULLNAME_CAN_NOT_BE_BLANK_ERROR_CODE : 1093,
                SUPPLIER_CONTACT_NO_CAN_NOT_BE_BLANK_ERROR_CODE : 1094,
                FAILED_TO_UPDATE_SUPPLIER_DATA_ERROR_CODE : 1096,
                FAILED_TO_SAVE_SUPPLIER_DATA_ERROR_CODE : 1095,
                FAILED_TO_FETCH_PURCHASE_DOCUMENTS_ERROR_CODE : 1098,
                SUPPLIER_ADDRESS_CAN_NOT_BE_BLANK_ERROR_CODE : 1099,
                FAILED_TO_DELETE_SUPPLIER_ERROR_CODE : 1097,
                SUPPLIER_ALREADY_EXIST_ERROR_CODE : 1100,



                //End: Supplier API Error Code


                // Start: Quotation API error Code

                FAILED_TO_FETCH_QUOTATION_DATA_ERROR_CODE : 1361,
                QUOTATION_ID_DOES_NOT_EXISTS_ERROR_CODE : 1362,
                QUOTATION_ALREADY_EXISTS_ERROR_CODE : 1369,
                FAILED_TO_SAVE_QUOTATION_DATA_ERROR_CODE : 1366,
                FAILED_TO_UPDATE_QUOTATION_DATA_ERROR_CODE : 1367,
                FAILED_TO_DELETE_QUOTATION_DATA_ERROR_CODE : 1368,
                QUOTATION_DOCUMENT_PATH_DOES_NOT_EXISTS_ERROR_CODE : 1365,
                CUSTOMER_ID_CAN_NOT_BE_BLANK_ERROR_CODE : 1363,
                QUOTATION_NO_CAN_NOT_BE_BLANK_ERROR_CODE : 1333,

                //End: Quotation API error Code


                // Start: Quotation Template API error code.

                FAILED_TO_FETCH_QUOTATION_TEMPLATE_DATA_ERROR_CODE : 1391,
                QUOTATION_TEMPLATE_ID_DOES_NOT_EXISTS_ERROR_CODE : 1392,
                QUOTATION_TEMPLATE_ALREADY_EXISTS_ERROR_CODE : 1395,
                QUOTATION_TEMPLATE_NAME_CAN_NOT_BE_BLANK_ERROR_CODE : 1393,
                PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE : 1394,
                FAILED_TO_SAVE_QUOTATION_TEMPLATE_DATA_ERROR_CODE : 1396,
                FAILED_TO_UPDATE_QUOTATION_TEMPLATE_DATA_ERROR_CODE : 1397,
                FAILED_TO_DELETE_QUOTATION_TEMPLATE_DATA_ERROR_CODE : 1398,

                // End:Quotation Template API error code

               
                // Start: POS Error Code 

                FAILED_TO_FETCH_POS_DATA_ERROR_CODE : 1421,
                POS_ID_DOES_NOT_EXISTS_ERROR_CODE : 1422,
                POS_ALREADY_EXISTS_ERROR_CODE : 1433,
                FAILED_TO_SAVE_POS_DATA_ERROR_CODE : 1434,
                FAILED_TO_UPDATE_POS_DATA_ERROR_CODE : 1435,
                FAILED_TO_DELETE_POS_DATA_ERROR_CODE : 1436,
                CUSTOMER_ID_CAN_NOT_BE_BlANK_ERROR_CODE : 1423,
                POS_DATE_CAN_NOT_BE_BlANK_ERROR_CODE : 1424,
                TOTAL_BILL_CAN_NOT_BE_BlANK_ERROR_CODE : 1425,
                PAYMENT_METHOD_CAN_NOT_BE_BLANK_ERROR_CODE : 1428,
                AMOUNT_CAN_NOT_BE_BLANK_ERROR_CODE : 1429,
                EXPIRED_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE : 1430,
                NEAR_EXPIRE_PRODUCT_DATA_NOT_FOUND_ERROR_CODE : 1431,
                LOW_STOCK_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE : 1432,
                CAN_NOT_DELETE_SALES_WITH_PAYMENTS_ERROR_CODE : 1437,


                //End:  POS Error Code 

                // Start: Sale return Error code

                FAILED_TO_FETCH_SALES_RETRUN_DATA_ERROR_CODE : 1451,
                SALES_RETRUN_ID_DOES_NOT_EXISTS_ERROR_CODE : 1452,
                SALES_RETRUN_ALREADY_EXISTS_ERROR_CODE : 1463,
                FAILED_TO_SAVE_SALES_RETRUN_DATA_ERROR_CODE : 1464,
                FAILED_TO_UPDATE_SALES_RETRUN_DATA_ERROR_CODE : 1465,
                FAILED_TO_DELETE_SALES_RETRUN_DATA_ERROR_CODE : 1466,
                BATCH_ID_DOES_NOT_EXISTS_ERROR_CODE : 1453,
                CUTOMER_ID_CAN_NOT_BE_BLANK_ERROR_CODE : 1454,
                RETURN_DATE_CAN_NOT_BE_BLANK_ERROR_CODE : 1455,
                QUANTITY_CAN_NOT_BE_BLANK_ERROR_CODE : 1458,
                SALE_RETURN_PAYMENT_METHOD_CAN_NOT_BE_BLANK_ERROR_CODE : 1459,
                SALE_RETURN_AMOUNT_CAN_NOT_BE_BLANK_ERROR_CODE : 1460,
                EXPIRED_PRODUCTS_NOT_FOUND_ERROR_CODE : 1461,
                NEW_EXPIRE_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE : 1462,
                LOW_STOCK_PRODUCTS_NOT_FOUND_ERROR_CODE : 1463,
                TOTAL_BILL_CAN_NOT_BE_BLANK_ERROR_CODE : 1456,

                // End: Sale return Error code

                // Start:Expenses Category Error Codes

                FAILED_TO_FETCH_EXPENSE_CATEGORY_CODE : 1511,
                EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS_ERROR_CODE : 1512,
                EXPENSE_CATEGORY_NAME_CAN_NOT_BE_BLANK_CODE : 1513,
                FAILED_TO_SAVE_EXPENSE_CATEGORY_ERROR_CODE : 1515,
                EXPENSE_CATEGORY_EXIST_ERROR_CODE : 1514,
                FAILED_TO_UPDATE_EXPENSE_CATEGORY_ERROR_CODE : 1516,
                FAILED_TO_DELETE_EXPENSE_CATEGORY_ERROR_CODE : 1517,

                //End: Expenses Category Error Codes


                // Start: Expenses Error Codes

                FAILED_TO_FETCH_EXPENSE_CODE : 1481,
                EXPENSEC_ID_DOES_NOT_EXISTS_ERROR_CODE : 1482,
                EXPENSE_DATE_CAN_NOT_BE_NULL_ERROR_CODE : 1483,
                EXPENSE_AMOUNT_CAN_NOT_BE_NULL_ERROR_CODE : 1484,
                EXPENSE_CATEGORY_ID_CAN_NOT_BE_NULL_ERROR_CODE : 1485,
                EXPENSE_NOTE_CAN_NOT_BE_NULL_ERROR_CODE : 1486,
                EXPENSE_NAME_CAN_NOT_BE_BLANK_CODE : 1490,
                FAILED_TO_SAVE_EXPENSE_ERROR_CODE : 1487,
                EXPENSE_EXIST_ERROR_CODE : 1491,
                FAILED_TO_UPDATE_EXPENSE_ERROR_CODE : 1488,
                FAILED_TO_DELETE_EXPENSE_ERROR_CODE : 1489,

                //End: Expenses Error Codes


                // Start:Purchase API error codes

                FAILED_TO_FETCH_PURCHASE_DATA_ERROR_CODE : 1301,
                PURCHASE_ID_DOES_NOT_EXISTS_ERROR_CODE : 1302,
                SUPPLIER_ID_CAN_NOT_BLANK_ERROR_CODE : 1303,
                PURCHASE_ALREADY_EXISTS_ERROR_CODE : 1325,
                FAILED_TO_SAVE_PURCHASE_DATA_ERROR_CODE : 1320,
                FAILED_TO_UPDATE_PURCHASE_DATA_ERROR_CODE : 1321,
                FAILED_TO_DELETE_PURCHASE_DATA_ERROR_CODE : 1322,
                PURCHASE_DOCUMENT_PATH_DOES_NOT_EXISTS_ERROR_CODE : 1319,
                INVOICE_NUMBER_CAN_NOT_BE_BLANK_ERROR_CODE : 1304,
                PURCHASE_DATE_CAN_NOT_BE_BLANK_ERROR_CODE : 1305,
                BATCH_NO_DOES_NOT_EXISTS_ERROR_CODE : 1323,
                BATCH_NO_CAN_NOT_BE_BLANK_ERROR_CODE : 1308,
                EXPIRY_DATE_CAN_NOT_BE_BLANK_ERROR_CODE : 1309,
                PACK_OF_CAN_NOT_BE_BLANK_ERROR_CODE : 1310,
                MRP_PER_PACK_CAN_NOT_BE_BLANK_ERROR_CODE : 1311,
                PURCHASE_QUANTITY_CAN_NOT_BE_BLANK_ERROR_CODE : 1312,
                PURCHASE_TOTAL_BILL_CAN_NOT_BE_BLANK_ERROR_CODE : 1313,
                PAYMENT_ID_DOES_NOT_EXISTS_ERROR_CODE : 1324,
                RECEIVER_NAME_CAN_NOT_BE_BLANK_ERROR_CODE : 1314,
                RECEIVER_CONTACT_CAN_NOT_BE_BLANK_ERROR_CODE : 1315,
                PAYMENT_DATE_CAN_NOT_BE_BLANK_ERROR_CODE : 1316,
                CAN_NOT_DELETE_PURCHASE_WITH_PAYMENTS_ERROR_CODE : 1324,


               // End: Purchase API error codes


                // Start: Purchase Return API error codes


                FAILED_TO_FETCH_PURCHASE_RETURN_DATA_ERROR_CODE : 1331,
                RETURN_ID_DOES_NOT_EXISTS_ERROR_CODE : 1332,
                SUPPLIER_ID_DOES_NOT_EXIST_ERROR_CODE : 1333,
                PURCHASE_RETURN_ALREADY_EXIST_ERROR_CODE : 1342,
                PRODUCT_ID_FK_DOES_NOT_EXISTS_ERROR_CODE : 1334,
                SUPPLIER_ID_CAN_NOT_BE_BLANK_ERROR_CODE : 1333,
                PRODUCT_ID_FK_CAN_NOT_BE_BLANK_ERROR_CODE : 1343,
                RETURN_REF_NO_CAN_NOT_BE_BLANK_ERROR_CODE : 1335,
                PURCHASE_RETURN_DATE_CAN_NOT_BE_BLANK_ERROR_CODE : 1336,
                BATCH_ID_FK_CAN_NOT_BE_BLANK_ERROR_CODE : 1337,
                RETURN_QUANTITY_CAN_NOT_BE_BLANK_ERROR_CODE : 1338,
                FAILED_TO_SAVE_PURCHASE_RETURN_DATA_ERROR_CODE : 1339,
                FAILED_TO_UPDATE_PURCHASE_RETURN_DATA_ERROR_CODE : 1340,
                FAILED_TO_DELETE_PURCHASE_RETURN_DATA_ERROR_CODE : 1341,
                BATCH_ID_FK_DOES_NOT_EXISTS_ERROR_CODE : 1342,

                // End: Purchase Return API error codes


                //Start: Purchase Order API error codes.

                FAILED_TO_FETCH_PURCHASE_ORDER_DATA_ERROR_CODE : 1271,
                PURCHASE_ORDER_NUMBER_CAN_NOT_BE_BLANK_ERROR_CODE : 1273,
                PURCHASE_ORDER_DATE_CAN_NOT_BE_BLANK_ERROR_CODE : 1275,
                SUPPLIER_ID_OF_PO_CAN_NOT_BE_BLANK_ERROR_CODE : 1276,
                PRODUCT_ID_FK_OF_PO_CAN_NOT_BE_BLANK_ERROR_CODE : 1277,
                ORDER_QUANTITY_OF_PO_CAN_NOT_BE_BLANK_ERROR_CODE : 1278,

                PURCHASE_ORDER_STATUS_CAN_NOT_BE_BLANK_ERROR_CODE : 1279,
                PURCHASE_ORDER_ALREADY_EXIST_ERROR_CODE : 1283,
                FAILED_TO_SAVE_PURCHASE_ORDER_DATA_ERROR_CODE : 1280,
                FAILED_TO_UPDATE_PURCHASE_ORDER_DATA_ERROR_CODE : 1281,
                FAILED_TO_DELETE_PURCHASE_ORDER_DATA_ERROR_CODE : 1282,
                PURCHASE_ORDER_ALREADY_EXISTS_ERROR_CODE : 1283,

                // End: Purchase Order API error codes.


              


                FAILED_TO_FETCH_FEATURE_DATA_ERROR_CODE : 1006,

                FAILED_TO_FETCH_QUOTATION_DOCUMENT_DATA_ERROR_CODE : 1545,

                INVALID_FILE_FORMAT_ERROR_CODE : 1549,

    }
    
    Messages =  {
                   
      INVALID_SEARCH_TYPE_MESSAGE : "Invalid search type passed.",
      INTERNAL_SERVER_ERROR : "Internal Server error occured.",
      INVALID_USER_MESSAGE : "Invalid userid and password.",
      INVALID_EMAIL_MESSAGE : "Invalid email Id or mobile number",
      INVALID_PASSWORD_MESSAGE: "Inavalid Password entered.",

      // Start: Customer API error message

      FAILED_TO_FETCH_CUSTOMER_DATA_MESSAGE : "Failed to get customer data",
      NO_CUSTOMER_FOUND_MESSAGE : "No customer found.",
      CUSTOMER_EXIST_MESSAGE : "Customer name already exists",
      CUSTOMER_NAME_CAN_NOT_BE_BLANK_MESSAGE : "Customer name should not be blank",
      FAILED_TO_SAVE_CUSTOMER_MESSAGE : "Failed to Save customer",
      FAILED_TO_UPDATE_CUSTOMER_MESSAGE : "Failed to update customer",
      CUSTOMER_NOT_DELETED_MESSAGE : "Failed to delete customer",
      CUSTOMER_ID_DOES_NOT_EXISTS_MESSAGE : "Customer Id doesn't exists.",
      CATEGORY_ID_CAN_NOT_BE_BLANK_MESSAGE : "Category Id can not be blank",
      CUSTOMER_CODE_CAN_NOT_BE_BLANK_MESSAGE : "Customer Code can not be blank",
      CUSTOMER_CONTACT_NO_1_CAN_NOT_BE_BLANK_MESSAGE : "Customer Contact no 1 can not be blank",
      


      // End: Customer API error message


      // Start: Product Brand API error message.

      NO_BRAND_FOUND_MESSAGE : "No Brands Found",
      FAILED_TO_FETCH_BRAND_DATA_MESSAGE : "Failed to fetch brand data.",
      BRAND_ALREADY_EXISTS_MESSAGE : "Brand name already exists",
      FAILED_TOUPDATE_BRAND_MESSAGE : "Failed to update Brand.",
      BRAND_NAME_CAN_NOT_BE_BLANK_MESSAGE : "Brand name can not be blank",
      FAILED_TO_DELETE_BRAND_MESSAGE : "Failed to delete Brand",
      FAILED_TO_SAVE_BRAND_MESSAGE : "Failed to save Brand",
      BRAND_ID_DOES_NOT_EXISTS_MESSAGE : "Brand Id doesn’t not exist.",

      // End: Product Brand API error message.

      // Start: Customer Category API error message.

      FAILED_TO_FETCH_CUSTOMER_CATEGORY_DATA_MESSAGE : "Failed to Fetch Customer category data.",
      CUSTOMER_CATEGORY_ID_DOES_NOT_EXISTS : "Customer Category Id doesn't exists.",
      NO_CUSTOMER_CATEGORY_FOUND_MESSAGE : "No customer category found.",
      CUSTOMER_CATEGORY_EXIST_MESSAGE : "Category name already exists",
      FAILED_TO_UPDATED_CUSTOMER_CATEGORY_MESSAGE : "Failed to update Customer category",
      FAILED_TO_DELETED_CUSTOMER_CATEGORY_MESSAGE : "Failed to delete Customer category",
      FAILED_TO_SAVE_CUSTOMER_CATEGORY_MESSAGE : "Failed to add Customer category",
      CUSTOMER_CATEGORY_NAME_CAN_NOT_BE_BLANK_MESSAGE : "Customer Category Name can not be blank",
      CUSTOMER_CONATCT_NUMBER_ALREADY_EXISTS_MESSAGE : "Customer Contact already exists.",

      // End: Customer Category API error messages.


      // Start: User Role API error messages

      FAILED_TO_FETCH_ROLES_DATA_MESSAGE : "Failed to get Roles data",
      ROLE_ID_DOES_NOT_EXISTS_MESSAGE : "Role Id does not exists",
      NO_ROLE_FOUND_MESSAGE : "No Role Found",
      ROLE_NAME_CAN_NOT_BE_BLANK : "Role name can not be black",
      ROLE_EXIST_MESSAGE : "Role already exists",
      FAILED_TO_SAVE_ROLE_MESSAGE : "Failed to save role",
      FAILED_TO_UPDATE_ROLE_MESSAGE : "Failed to update role",
      FAILED_TO_DELETE_ROLE_MESSAGE : "Failed to delete role",
      FEATURE_ID_DOES_NOT_EXISTS : "Feature does not exists",
      UNAUTHORIZED_ROLE_DATA_ACCESS_ERROR_CODE : "Unauthorized Role data access.",

      // End:User Role API error messages.


      // Start: Product API error messages.

      FAILED_TO_FETCH_PRODUCT_DATA_MESSAGE : "Failed to get product data",
      PRODUCT_ID_DOES_NOT_EXISTS_MESSAGE : "No product found.",
      PRODUCT_EXIST_MESSAGE : "Product name already exists",
      FAILED_TO_UPDATE_PRODUCT_MESSAGE : "Failed to update Product",
      FAILED_TO_DELETE_PRODUCT_MESSAGE : "Failed to delete Product",
      FAILED_TO_SAVE_PRODUCT_MESSAGE : "Failed to delete Product",
      PRODUCT_NAME_CAN_NOT_BE_BLANK : "Product Name can not be blank",
      BRAND_ID_CAN_NOT_BE_BLANK_MESSAGE : "Brand Id can not be blank",
      PRODUCT_CATEGORY_ID_CAN_NOT_BE_BLANK_MESSAGE : "Product category Id can not be blank",
      ALERT_QUANTITY_CAN_NOT_BE_BLANK_MESSAGE : "Alert Quantity can not be blank",

      // End: Product API error messages.


      // Start: Product category API error messages

      FAILED_TO_FETCH_PRODUCT_CATEGORY_DATA_MESSAGE : "Failed to fetch Product Category data",
      PRODUCT_CATEGORY_ID_DOES_NOT_EXISTS_MESSAGE : "Product Category Id does not exits",
      NO_PRODUCT_CATEGORY_FOUND_MESSAGE : "No Product Category found ",
      PRODUCT_CATEGORY_NAME_CAN_NOT_BE_BLANK_ERROR_CODE : "Product Category name can not be blank",
      FAILED_TO_SAVE_PRODUCT_CATEGORY_MESSAGE : "Failed to save Product Category",
      FAILED_TO_UPDATE_PRODUCT_CATEGORY_MESSAGE : "Failed to update Product Category",
      FAILED_TO_DELETE_PRODUCT_CATEGORY_MESSAGE : "Failed to delete Product Category",
      PRODUCT_CATEGORY_EXIST_MESSAGE : "Product Category Already exists",

      // End: Product category API error messages.


      // Start: Supplier API error messages

      FAILED_TO_FETCH_SUPPLIER_DATA_MESSAGE : "Failed to get Supplier data",
      SUPPLIER_ID_DOES_NOT_EXISTS_MESSAGE : "Supplier Id does not exists.",
      SUPPLIER_ALREADY_EXIST_MESSAGE : "Supplier name already exists",
      FAILED_TO_SAVE_SUPPLIER_MESSAGE : "Failed to save Supplier",
      FAILED_TO_UPDATE_SUPPLIER_MESSAGE : "Failed to Update Supplier",
      FAILED_TO_DELETE_SUPPLIER_MESSAGE : "Failed to delete Supplier",
      SUPPLIER_CONTACT_NO_CAN_NOT_BE_BLANK_MESSAGE : "Supplier contact no can not be blank",
      SUPPLIER_NAME_CAN_NOT_BE_BLANK_MESSAGE : "Supplier name can not be blank",
      SUPPLIER_ADDRESS_CAN_NOT_BE_BLANK_MESSAGE : "Supplier address can not be blank",
      FAILED_TO_FETCH_PURCHASE_DOCUMENTS_ERROR_CODE : "Failed to fetch Purchase documents.",

      // End: Supplier API error messages.


      // Start: Users API error messages.

      FAILED_TO_FETCH_USER_DATA : "Failed to fetch User data.",
      USER_ID_DOES_NOT_EXIST : "User Id does not exists.",
      NO_USER_FOUND_MESSAGE : "No matching User found",
      INVALID_USER_EMAIL_MESSAGE : "Invalid user email Id. ",
      USER_EMAIL_CAN_NOT_BE_BLANK_MESSAGE : "User email id can not be blank.",
      USER_NAME_CAN_NOT_BE_BLANK_MESSAGE : "User name can not be blank.",
      FAILED_TO_ADD_USER_MESSAGE : "Failed to add user data. ",
      FAILED_TO_UPDATE_USER_MESSAGE : "Failed to update user data. ",
      FAILED_TO_DELETE_USER_MESSAGE : "Failed to Delete user data. ",

      // End: Users API error messages.


      // Start: Quotation API error messages.

      FAILED_TO_FETCH_QUOTATION_DATA_MESSAGE : "Failed to fetch Quotation data.",
      QUOTATION_ID_DOES_NOT_EXISTS_ERROR_CODE : "Quotation Id does not exists.",
      QUOTATION_ALREADY_EXISTS_MESSAGE : "Quotation already exists.",
      FAILED_TO_SAVE_QUOTATION_MESSAGE : "Failed to save quotation user data.",
      FAILED_TO_UPDATE_QUOTATION_MESSAGE : "Failed to update quotation user data.",
      FAILED_TO_DELETE_QUOTATION_MESSAGE : "Failed to delete quotation user data.",
      QUOTATION_DOCUMENT_PATH_DOES_NOT_EXISTS_MESSAGE : "Quotation document path does not exists",
      CUSTOMER_ID_CAN_NOT_BE_BLANK : "Customer Id can not be blank",
      QUOTATION_NO_CAN_NOT_BE_BLANK : "Quotation no can not be blank",

      // End: Quotation API error messages.


      // Start: Quotation Template API error messages.

      FAILED_TO_FETCH_QUOTATION_TEMPLATE_DATA_MESSAGE : "Failed to fetch Quotation Template data.",
      QUOTATION_TEMPLATE_ID_DOES_NOT_EXISTS_MESSAGE : "Quotation Template Id does not exists.",
      QUOTATION_TEMPLATE_NAME_CAN_NOT_BE_BLANK_MESSAGE : "Quotation Template name can not be blank.",
      QUOTATION_TEMPLATE_ALREADY_EXISTS_MESSAGE : "Quotation Template already exists.",
      FAILED_TO_SAVE_QUOTATION_TEMPLATE_MESSAGE : "Failed to save quotation Template  data.",
      FAILED_TO_UPDATE_QUOTATION_TEMPLATE_MESSAGE : "Failed to update Quotation Template  data.",
      FAILED_TO_DELETE_QUOTATION_TEMPLATE_MESSAGE : "Failed to delete quotation Template  data.",

      // End: Quotation Template API error messages.


      // Start: POS API error messages.

      FAILED_TO_FETCH_POS_DATA_MESSAGE : "Failed to fetch  POS data.",
      POS_ID_DOES_NOT_EXISTS_MESSAGE : "POS Id does not exists.",
      POS_ALREADY_EXISTS_MESSAGE : "POS already exists.",
      FAILED_TO_SAVE_POS_MESSAGE : "Failed to save POS  data.",
      FAILED_TO_UPDATE_POS_MESSAGE : "Failed to update POS  data.",
      FAILED_TO_DELETE_POS_MESSAGE : "Failed to delete POS  data.",
      CUTOMER_ID_CAN_NOT_BE_BLANK_MESSAGE : "Customer Id can not be blank",
      POS_DATE_CAN_NOT_BE_BLANK_MESSAGE : "POS date can not be blank",
      TOTAL_BILL_CAN_NOT_BE_BLANK_MESSAGE : "Total Bill can not be blank",
      PAYMENT_METHOD_CAN_NOT_BE_BLANK_MESSAGE : "Payment Method can not be blank",
      AMOUNT_CAN_NOT_BE_BLANK_MESSAGE : "Amount can not be blank",
      CAN_NOT_DELETE_SALES_WITH_PAYMENTS_MESSAGE : "Can not delete Sales with Sales Payment",
      EXPIRED_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE : "Expired products data not found.",
      LOW_STOCK_PRODUCTS_DATA_NOT_FOUND_ERROR_CODE : "Low stock products data not found.",
      NEAR_EXPIRE_PRODUCT_DATA_NOT_FOUND_ERROR_CODE : "Near Expire products data not found.",

      // End: POS API error messages.


      // Start: SaleReturn API error messages.

      FAILED_TO_FETCH_SALESRETURN_DATA_MESSAGE : "Failed to fetch  sale retrun data.",
      SALES_RETURN_ID_DOES_NOT_EXISTS_MESSAGE : "Sales retrun Id does not exists.",
      SALES_RETURN_ALREADY_EXISTS_MESSAGE : "Sales return already exists.",
      FAILED_TO_SAVE_SALESRETURN_MESSAGE : "Failed to save sales return data.",
      FAILED_TO_UPDATE_SALESRETURN_MESSAGE : "Failed to update sales return data.",
      FAILED_TO_DELETE_SALESRETURN_MESSAGE : "Failed to delete sales return data.",
      BATCH_ID_DOES_NOT_EXISTS_MESSAGE : "Batch Id does not exists.",
      RETURN_DATE_CAN_NOT_BE_BLANK_MESSAGE : "Return date can not be blank",
      PRODUCT_ID_CAN_NOT_BE_BLANK_ERROR_CODE : "Product Id can not be blank.",
      QUANTITY_CAN_NOT_BE_BLANK_ERROR_CODE : "Quantity can not be blank.",
      SALE_RETURN_PAYMENT_METHOD_CAN_NOT_BE_BLANK_ERROR_CODE : "PaymentMethod can not be blank.",
      SALE_RETURN_AMOUNT_CAN_NOT_BE_BLANK_ERROR_CODE : "Amount can not be blank.",
      EXPIRED_PRODUCTS_NOT_FOUND_ERROR_CODE : "Expired products data not found.",
      LOW_STOCK_PRODUCTS_NOT_FOUND_ERROR_CODE : "Low stock products data not found.",
      TOTAL_BILL_CAN_NOT_BE_BLANK_ERROR_CODE : "Total Bill can not be blank.",

      //End: SaleReturn API error messages.


      //Start: Expense Category API error messages.

      FAILED_TO_FETCH_EXPENSE_CATEGORY_DATA_MESSAGE : "Failed to get expenses category data.",
      EXPENSE_CATEGORY_ID_DOES_NOT_EXISTS : "Expense Category Id doesn't exists.",
      EXPENSE_CATEGORY_NAME_CAN_NOT_BE_BLANK_MESSAGE : "Expense Category name can not be blank.",
      EXPENSE_CATEGORY_EXIST_MESSAGE : "Expense Category name already exists",
      FAILED_TO_UPDATED_EXPENSE_CATEGORY_MESSAGE : "Failed to update expense category", 
      FAILED_TO_DELETED_EXPENSE_CATEGORY_MESSAGE : "Failed to delete expense category",
      FAILED_TO_SAVE_EXPENSE_CATEGORY_MESSAGE : "Failed to add expense category",
     
      

      //end: Expense Category API error messages.


      // Start: Expense API error messages.

      FAILED_TO_FETCH_EXPENSE_DATA_MESSAGE : "Failed to get expense data.",
      EXPENSE_ID_DOES_NOT_EXISTS : "Expense  Id doesn't exists.",
      EXPENSE_NAME_CAN_NOT_BE_BLANK_MESSAGE : "Expense name can not be blank.",
      EXPENSE_EXIST_MESSAGE : "Expense name already exists",
      FAILED_TO_UPDATED_EXPENSE_MESSAGE : "Failed to update expense",
      FAILED_TO_DELETED_EXPENSE_MESSAGE : "Failed to delete expense",
      FAILED_TO_SAVE_EXPENSE_MESSAGE : "Failed to add expense",
      EXPENSE_NOTE_CAN_NOT_BE_NULL_MESSAGE : "Expense note can not be blank",
      EXPENSE_DATE_CAN_NOT_BE_NULL_MESSAGE : "Expense date can not be blank",
      EXPENSE_AMOUNT_CAN_NOT_BE_NULL_MESSAGE : "Expense amount can not be blank",
      EXPENSE_CATEGORY_ID_CAN_NOT_BE_NULL_MESSAGE : "Expense category Id can not be blank",


      // End: Expense API error messages.


      //Start: Purchase API error messages.

      FAILED_TO_FETCH_PURCHASE_DATA_MESSAGE : "Failed to fetch Purchase data.",
      PURCHASE_ID_DOES_NOT_EXISTS_MESSAGE : "Purchase Id does not exists.",
      PURCHASE_ALREADY_EXISTS_MESSAGE : "Purchase already exists.",
      FAILED_TO_SAVE_PURCHASE_MESSAGE : "Failed to save Purchase user data.",
      FAILED_TO_UPDATE_PURCHASE_MESSAGE : "Failed to update Purchase user data.",
      FAILED_TO_DELETE_PURCHASE_MESSAGE : "Failed to delete Purchase user data.",
      PURCHASE_DOCUMENT_PATH_DOES_NOT_EXISTS_MESSAGE : "Purchase document path does not exists",
      INVOICE_NUMBER_CAN_NOT_BE_BLANK : "Invoice Number Can Not Be Blank",
      PURCHASE_DATE_CAN_NOT_BE_BLANK : " Purchase Date Can Not Be Blank",
      BATCH_NO_DOES_NOT_EXISTS_MESSAGE : "Batch no does not Exist",
      BATCH_NO_CAN_NOT_BE_BLANK : "Batch no can not be Blank",
      EXPIRY_DATE_CAN_NOT_BE_BLANK : "Expiry Date can not be Blank",
      PACK_OF_CAN_NOT_BE_BLANK : "Pack Of can not be Blank",
      MRP_PER_PACK_CAN_NOT_BE_BLANK : "MRP per Pack can not be Blank",
      QUANTITY_CAN_NOT_BE_BLANK : "Quantity can not be Blank",
      TOTAL_BILL_CAN_NOT_BE_BLANK : "Total Bill can not be Blank",
      PAYMENT_ID_DOES_NOT_EXISTS_MESSAGE : "Payment Id Does Not Exist",
      RECEIVER_NAME_CAN_NOT_BE_BLANK : "Receiver Name can not be Blank",
      RECEIVER_CONTACT_CAN_NOT_BE_BLANK : "Receiver Contact can not be Blank",
      PAYMENT_DATE_CAN_NOT_BE_BLANK : "Payment date can not be Blank",
      AMOUNT_CAN_NOT_BE_BLANK : "Amount can not be Blank",
      PAYMENT_METHOD_CAN_NOT_BE_BLANK : "Payment Method can not be Blank",
      CAN_NOT_DELETE_PURCHASE_WITH_PAYMENTS_MESSAGE : "Can not delete Purchase with Purchase Payment",

      //End: Purchase API error messages.



      //Start: Purchase return API error messages.

      FAILED_TO_FETCH_PURCHASE_RETURN_DATA_MESSAGE : "Failed to fetch purchase return data",
      RETRUN_ID_DOES_NOT_EXISTS_MESSAGE : "Return id does not exist",
      PURCHASE_RETURN_ALREADY_EXISTS_MESSAGE : "Purchase Return already exist",
      PRODUCT_ID_FK_DOES_NOT_EXISTS_MESSAGE : "Product Id does not exist",
      FAILED_TO_SAVE_PURCHASE_RETURN_MESSAGE : "failed to save Purchase Return data ",
      FAILED_TO_DELETE_PURCHASE_RETURN_MESSAGE : "failed to delete Purchase return data",
      BATCH_ID_FK_DOES_NOT_EXISTS_MESSAGE : "Batch Id does not exist",
      FAILED_TO_UPDATE_PURCHASE_RETURN_MESSAGE : "failed to update Purchase return data",
      SUPPLIER_ID_CAN_NOT_BE_BLANK : "Supplier id can not be blank",
      RETURN_REF_NO_CAN_NOT_BE_BLANK : "Return Ref No can not be blank",
      RETURN_DATE_CAN_NOT_BE_BLANK : "Return Date can not be blank",
      PRODUCT_ID_FK_CAN_NOT_BE_BLANK : " not be blank",
      BATCH_ID_FK_CAN_NOT_BE_BLANK : "Batch id can not be blank",
      RETURN_QUANTITY_CAN_NOT_BE_BLANK : "Return Quantity can not be blank",
      NO_DATA_AVAILABLE_MESSAGE : "No data Available",

      //End: Purchase return API error messages.


      //Start: Purchase Order API error messages.

      FAILED_TO_FETCH_PURCHASE_ORDER_DATA_MESSAGE : "Failed to Fetch purchase order data",
      PURCHASE_ORDER_ALREADY_EXISTS_MESSAGE : "purchase order data already exists",
      PURCHASE_ORDER_NUMBER_CAN_NOT_BE_BLANK : "Purchase Order Number can not be blank",
      PURCHASE_ORDER_DATE_CAN_NOT_BE_BLANK : "Purchase Order Date can not be blank",
      SUPPLIER_ID_OF_PO_CAN_NOT_BE_BLANK : "Supplier id of Purchase Order can not be blank",
      PURCHASE_ORDER_STATUS_CAN_NOT_BE_BLANK : "Purchase Order Status can not be blank",
      PRODUCT_ID_FK_OF_PO_CAN_NOT_BE_BLANK : "Product Id of Purchase Order Record can not be blank",
      ORDER_QUANTITY_OF_PO_CAN_NOT_BE_BLANK : "Purchase Order Quantity can not be blank",
      FAILED_TO_SAVE_PURCHASE_ORDER_MESSAGE : "Failed to save Purchase order data",
      FAILED_TO_UPDATE_PURCHASE_ORDER_MESSAGE : "Failed to update Purchase order data",
      FAILED_TO_DELETE_PURCHASE_ORDER_MESSAGE : "Failed to delete Purchase order data",
      PURCHASE_ORDER_NUMBER_CAN_NOT_BE_BLANK_ERROR_CODE : "Purchase Note can not be blank.",
      PURCHASE_ORDER_ALREADY_EXISTS_ERROR_CODE : "Purchase order already exists.",

      // End: Purchase Order API error messages.


      FAILED_TO_FETCH_FEATURE_DATA_MESSAGE : "failed to fetch Features data",

      FAILED_TO_FETCH_QUOTATION_DOCUMENT_DATA_MESSAGE : "failed to fetch Quotation data",
   
      
   }
   
   
   
   }


