import { Component, OnInit } from '@angular/core';
// Date Range Picker Import Libraries
import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface PeriodicElement {
  Product_Name:string;
  Unit_Price: number;
  Current_Stock: number;
  Current_Stock_Value: number;
  Units_Sold: number;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Product_Name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempore dolor fuga voluptate incidunt,", Unit_Price: 12345, Current_Stock: 12345,Current_Stock_Value: 12345, Units_Sold:12345,},
  {Product_Name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempore dolor fuga voluptate incidunt,", Unit_Price: 12345, Current_Stock: 12345,Current_Stock_Value: 12345, Units_Sold:12345,},
  {Product_Name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempore dolor fuga voluptate incidunt,", Unit_Price: 12345, Current_Stock: 12345,Current_Stock_Value: 12345, Units_Sold:12345,},
  {Product_Name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempore dolor fuga voluptate incidunt,", Unit_Price: 12345, Current_Stock: 12345,Current_Stock_Value: 12345, Units_Sold:12345,},
  {Product_Name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempore dolor fuga voluptate incidunt,", Unit_Price: 12345, Current_Stock: 12345,Current_Stock_Value: 12345, Units_Sold:12345,},
  {Product_Name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempore dolor fuga voluptate incidunt,", Unit_Price: 12345, Current_Stock: 12345,Current_Stock_Value: 12345, Units_Sold:12345,},
  {Product_Name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempore dolor fuga voluptate incidunt,", Unit_Price: 12345, Current_Stock: 12345,Current_Stock_Value: 12345, Units_Sold:12345,},
  {Product_Name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempore dolor fuga voluptate incidunt,", Unit_Price: 12345, Current_Stock: 12345,Current_Stock_Value: 12345, Units_Sold:12345,},
  ];
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReportsComponent implements OnInit {
  
   // Date Range Picker 
  //  selectedIndex=this.api.sales;
  ngAfterViewInit() {
    $('input[name="daterange"]').daterangepicker({
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      opens: 'left',
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  }

  displayedColumns: string[] = ['Product_Name', 'Unit_Price', 'Current_Stock', 'Current_Stock_Value','Units_Sold'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
