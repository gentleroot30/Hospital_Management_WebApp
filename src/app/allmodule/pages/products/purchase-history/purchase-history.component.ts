import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  userName: string;
  purchasedue: string;
  contact:string;
  purchasereturndue:string;
}

const ELEMENT_DATA: PeriodicElement[] = []
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PurchaseHistoryComponent implements OnInit {
  columnsToDisplay: string[] = ['purchaseDate','batchNo', 'expiryDate', 'packOf', 'mrpPerPack', 'orderQuantity','unitPrice','totalMRP'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  productId : number = 0;
  templateProducts: any[] = [];
  products:any[]=[];
  productName: string = '';
  currentStock: number = 0;
  totalMRPSum: number = 0;
  expandedElement!: PeriodicElement | null;
  constructor(public dialog: MatDialog , private api:ProductService,private  activeRouter:ActivatedRoute, router:Router,private constants: Constants) { }

  ngOnInit(): void {
    
this.productId = this.activeRouter.snapshot.queryParams['productId']
this.api.getPurchaseHistoryByProductId(this.productId).subscribe({
  next:(res)=>{
    
    this.productName = res.data.productName;
    this.currentStock = res.data.currentStock;
    this.templateProducts = res.data.purchaseHistory;
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.templateProducts);
  }
})

this.calculateTotalMrp()
  }


  calculateTotalMrp(){
    let total = 0;
      for (const product of this.templateProducts) {
        if(!isNaN(product.totalMRP)){
          total += product.totalMRP;
        }
        
      }
      return total;
  }
}
