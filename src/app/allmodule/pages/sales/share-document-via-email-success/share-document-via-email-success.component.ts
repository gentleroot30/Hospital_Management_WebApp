import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-document-via-email-success',
  templateUrl: './share-document-via-email-success.component.html',
  styleUrls: ['./share-document-via-email-success.component.css']
})
export class ShareDocumentViaEmailSuccessComponent implements OnInit {

  dialogRef: any;

  constructor(public dialog: MatDialog,public dialog2: MatDialogRef<ShareDocumentViaEmailSuccessComponent>) { }

  onNoClick(): void {
  
    this.dialog2.close(ShareDocumentViaEmailSuccessComponent);
    
  }
  

  ngOnInit(): void {
  }

}
