import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UseTemplateEditSuccessComponent } from '../use-template-edit-success/use-template-edit-success.component';

@Component({
  selector: 'app-use-template-edit',
  templateUrl: './use-template-edit.component.html',
  styleUrls: ['./use-template-edit.component.css']
})
export class UseTemplateEditComponent implements OnInit {
  viewRoleForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,public dialog1: MatDialogRef<UseTemplateEditComponent>) { }
    
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

  useTemplateEditSuccess(): void {
    this.dialog.open(UseTemplateEditSuccessComponent, {
      width:'604px',
      height:'270px',
    })
  }


  onNoClick():void {
    this.dialog1.close(UseTemplateEditComponent)
  }

  onClose():void {
    this.dialog1.close(UseTemplateEditSuccessComponent)
  }

}
