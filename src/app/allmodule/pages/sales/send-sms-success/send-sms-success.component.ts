import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-sms-success',
  templateUrl: './send-sms-success.component.html',
  styleUrls: ['./send-sms-success.component.css']
})
export class SendSmsSuccessComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialog1: MatDialogRef<SendSmsSuccessComponent>) { }
  onNoClick():void {
    this.dialog1.close(SendSmsSuccessComponent)
  }
  ngOnInit(): void {
  }

}
