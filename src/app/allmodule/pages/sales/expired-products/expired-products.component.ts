import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expired-products',
  templateUrl: './expired-products.component.html',
  styleUrls: ['./expired-products.component.css']
})
export class ExpiredProductsComponent implements OnInit {
  displayedColumns: string[] = ['dateandtime', 'category', 'customerName', 'ethnicity', 'address', 'action'];
  dataSources = ELEMENT_DATA;
  




  constructor() { }

  ngOnInit(): void {
  }

  deleteProductDialog(): void {
    // const dialogRef = this.dialog.open(DeleteProductComponent, {
    //   width:'604px',height:'391px',
    // });
  }
  deleteCategoryDialog(): void {
    // const dialogRef = this.dialog.open(DeleteCategoryComponent, {
    //   width: '604px',height:'391px',
    // });
  }

  deleteBrandDialog(): void {
    // const dialogRef = this.dialog.open(DeleteBrandComponent, {
    //   width: '604px',height:'391px',
    // });
  }
  categoryOpenDialog() {
    // this.dialog.open(AddCategoryComponent,{
    //   width:'607px',height:'409px',
    // });
  }
  editCategoryDialog() {
    // this.dialog.open(EditCategoryComponent,{
    //   width:'607px',height:'409px',
    // });
  }
  viewCategoryDialog() {
    // this.dialog.open(ViewCategoryComponent,{
    //   width:'607px',height:'409px',
    // });
  }

  brandOpenDialog() {
    // this.dialog.open(AddBrandComponent,{
    //   width:'607px',height:'409px',
    // });
  }

  editBrandDialog() {
    // this.dialog.open(EditBrandComponent,{
    //   width:'607px',height:'409px',
    // });
  }

  viewBrandDialog() {
    // this.dialog.open(ViewBrandComponent,{
    //   width:'607px',height:'409px',
    // });
  }

}

export interface PeriodicElement {
  dateandtime: string;
  category: string;
  customerName: string;
  ethnicity:string;
  address:string;
  }
  interface Options {
    value: string;
    viewValue: string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Amit Singh', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Barjesh Kumar', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Chandana C', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Dharini Nair', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Emmanuel Roy', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Fakrudin Shek', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Gaytri Ram', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Hima Rathore', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'Ishitha Roy Kapoor', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    {dateandtime: '12/06/2022, 12:00pm', category: 'WalkIn', customerName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', ethnicity:'xyz', address: 'A Apartment B wing C Street'},
    
    
  ];
  