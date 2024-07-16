import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-use-template-view',
  templateUrl: './use-template-view.component.html',
  styleUrls: ['./use-template-view.component.css']
})
export class UseTemplateViewComponent implements OnInit {
  viewRoleForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialogRef<UseTemplateViewComponent>) { }
  onNoClick(): void {
    
    this.dialog.close();
    
  }
  ngOnInit(): void {
    this.viewRoleForm = this.formBuilder.group({
		  RoleTitle: ['', Validators.required],
      Description: ['', Validators.required],
		});
  }

  get f() { return this.viewRoleForm.controls; }

  viewrole(){
    this.submitted = true;
    if(!this.viewRoleForm.valid){
       return;
    }
  }

}
