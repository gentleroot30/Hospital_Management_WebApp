import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface PeriodicElement {
  Product_Name: string;
  Batch_No: string;
  Exp_Date: string;
  Pack_of: string;
  MRP_per_Pack:string;
  UnitPrice:string;
  Quantity:string;
  TotalMRP:string;
  Bill_Total:string;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
  { Product_Name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis quam quam arcu quam mauris .', Batch_No: 'Enter Here', Exp_Date: 'Enter Here', Pack_of: 'Enter Here', MRP_per_Pack:'Enter Here',UnitPrice:'500.00',Quantity:'Enter Here',TotalMRP:'Enter Here',Bill_Total:'Enter Here'},
];
@Component({
  selector: 'app-edit-purchases',
  templateUrl: './edit-purchases.component.html',
  styleUrls: ['./edit-purchases.component.css']
})
export class EditPurchasesComponent implements OnInit {

  inputNumber: number | undefined;
  convertedText: string | undefined;
  addUserForm!: FormGroup;
  submitted = false;
 
  numberToWordsService: any;
  
  createdDivs: any[] = [];
  addPurchasesForm: any;
  api: any;
  displayedColumns: string[] = ['Product_Name', 'Batch_No', 'Exp_Date', 'Pack_of','MRP_per_Pack', 'UnitPrice','Quantity','TotalMRP','Bill_Total'];
  dataSource = ELEMENT_DATA;
  createDiv() {
    if (this.createdDivs.length < 4) {
      this.createdDivs.push({});
    }
  }
  constructor( private formBuilder: FormBuilder,) { }
  
  convertToWords(): void {
    if (this.inputNumber !== undefined) {
      this.convertedText = this.numberToWordsService.convert(this.inputNumber) + ' Only';
    } else {
      this.convertedText = undefined;
    }
  }

  ngOnInit(): void {
    
    this.addPurchasesForm = this.formBuilder.group({
      supplier: ['', Validators.required],
      
      documentLocation: ['', Validators.required],
      
    });

         
  }

  get f() { return this.addPurchasesForm.controls; }

  




  uploadedFiles: File[] = [];

 onFileSelected(event: any) {
   const files: FileList = event.target.files;
   for (let i = 0; i < files.length; i++) {
     this.uploadedFiles.push(files.item(i)!); // Use non-null assertion operator (!) to handle null case ts
   }
 }

 onUpload() {
   // Implement your file upload logic here upload file
   console.log('Uploading files:', this.uploadedFiles);
   // Clear uploadedFiles after upload, if required
   // this.uploadedFiles = [];
 }

 onDrop(event: DragEvent) {
   event.preventDefault();
   const files = event.dataTransfer?.files;
   if (files) {
     for (let i = 0; i < files.length; i++) {
       this.uploadedFiles.push(files[i]!); // Use non-null assertion operator (!) to handle null case
     }
   }
 }

 onDragOver(event: DragEvent) {
   event.preventDefault();
 }

  getHeight() {
    const baseHeight = 300; // Set your desired base height in pixels
    const fileHeight = 15; // Set the height for each uploaded file in pixels
    return baseHeight + this.uploadedFiles.length * fileHeight;
  }
  
  getHeight2() {
    const baseHeight = 226; // Set your desired base height in pixels
    const fileHeight = 15; // Set the height for each uploaded file in pixels
    return baseHeight + this.uploadedFiles.length * fileHeight;
  }

}

