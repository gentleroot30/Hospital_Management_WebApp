import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-returns',
  templateUrl: './delete-returns.component.html',
  styleUrls: ['./delete-returns.component.css']
})
export class DeleteReturnsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteReturnsComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
  }

}
