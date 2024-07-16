import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


// Date Range Picker Import Libraries
import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { ShareDocumentViaEmailComponent } from '../share-document-via-email/share-document-via-email.component';



@Component({
  selector: 'app-quotation-documents',
  templateUrl: './quotation-documents.component.html',
  styleUrls: ['./quotation-documents.component.css']
})
export class QuotationDocumentsComponent implements OnInit {
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
dialogRef:any;

  constructor(public dialog: MatDialog) { }
  shareDocumentViaEmail() {
    this.dialog.open(ShareDocumentViaEmailComponent,{
      width:'607px',height:'240px',
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
