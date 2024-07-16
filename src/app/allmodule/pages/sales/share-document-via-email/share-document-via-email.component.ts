import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { ShareDocumentViaEmailSuccessComponent } from '../share-document-via-email-success/share-document-via-email-success.component';


@Component({
  selector: 'app-share-document-via-email',
  templateUrl: './share-document-via-email.component.html',
  styleUrls: ['./share-document-via-email.component.css']
})
export class ShareDocumentViaEmailComponent implements OnInit {
dialogRef:any;

  constructor(public dialog: MatDialog,public dialog1:MatDialogRef<ShareDocumentViaEmailComponent>,) { }
  documentShareEmailSuccess() {
    this.dialog.open(ShareDocumentViaEmailSuccessComponent,{
      width:'607px',height:'280px',
    });
  }
  onNoClick(): void {
    this.dialog1.close();
  }
  ngOnInit(): void {
  }

}
