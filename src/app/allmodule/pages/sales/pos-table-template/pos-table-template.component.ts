import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pos-table-template',
  templateUrl: './pos-table-template.component.html',
  styleUrls: ['./pos-table-template.component.css']
})
export class PosTableTemplateComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'quantity'];
  dataSource = new MatTableDataSource<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data.products);
  }
}
