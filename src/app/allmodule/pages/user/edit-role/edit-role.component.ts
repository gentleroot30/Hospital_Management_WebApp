import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';
import { Constants } from 'src/app/app.constants';
@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  editRoleForm!: FormGroup;
  submitted = false;
  allFeatures:any[]=[];
  editdata: any;
 
  constructor(
    private formBuilder: FormBuilder,private api:UserService,public dialogRef:MatDialogRef<EditRoleComponent>,private toastr: ToastrService,private constants:Constants ,@Inject(MAT_DIALOG_DATA) public data:any)
   {  
    this.editdata=data;
   }

   onNoClick(): void {
    this.dialogRef.close();
   
  }

  ngOnInit(): void {
    this.editRoleForm = this.formBuilder.group({
    
		  roleName: ['', [Validators.required,
        Validators.pattern(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/),

        Validators.maxLength(20)]],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ]

		});

    
    this.api.GetRoleById(this.editdata).subscribe({  
      next:(res)=>{
      this.allFeatures = res.data[0].features;

      this.allFeatures.forEach(feature => {
        this.editRoleForm.addControl(`feature_${feature.featureId}_view`, new FormControl(feature.view));
        this.editRoleForm.addControl(`feature_${feature.featureId}_add`, new FormControl(feature.add));
        this.editRoleForm.addControl(`feature_${feature.featureId}_edit`, new FormControl(feature.edit));
        this.editRoleForm.addControl(`feature_${feature.featureId}_delete`, new FormControl(feature.delete));

        if (feature.view && feature.add && feature.edit && feature.delete) {
          feature.all=true;
        }

        this.editRoleForm.addControl(`feature_${feature.featureId}_all`, new FormControl(feature.all));
      });
      this.editRoleForm.addControl(`roleId`, new FormControl(res.data[0].roleId)); 
     
      this.editRoleForm.patchValue({
        
        roleName: res.data[0].roleName,
        description:res.data[0].description,

      })
      // this.editRoleForm.patchValue({ roleName: res.data[0].roleName });
      // this.editRoleForm.patchValue({ description: res.data[0].description });



    

      
    },
      })
      
    

    
   
  }

 
  get f() { return this.editRoleForm.controls; }

  EditRole(){
   
      
    const features = this.allFeatures.map(feature => {
      const featureId = feature.featureId;
      const viewControl = this.editRoleForm.get(`feature_${featureId}_view`);
      const addControl = this.editRoleForm.get(`feature_${featureId}_add`);
      const editControl = this.editRoleForm.get(`feature_${featureId}_edit`);
      const deleteControl = this.editRoleForm.get(`feature_${featureId}_delete`);
     
  
      return {
        featureId,
        view: viewControl ? viewControl.value : false,
        add: addControl ? addControl.value : false,
        edit: editControl ? editControl.value : false,
        delete: deleteControl ? deleteControl.value : false,
        
      };
    });
 
    const data = {
      roleId: this.editRoleForm.get('roleId')?.value,
      roleName: this.editRoleForm.get('roleName')?.value,
      description: this.editRoleForm.get('description')?.value,
      features: features,
    };
    this.submitted = true;
    if(this.editRoleForm.valid){
      
      this.api.UpdateUserRole(data).subscribe({
        next:(res) =>{
          
          this.dialogRef.close(res)
        },
        error:(error)=>{
          if(error.error.error)
          {
            if(error.error.error.code === this.constants.ErrorCodes.ROLE_ID_DOES_NOT_EXISTS_ERROR_CODE)
            {
              this.toastr.error(this.constants.Messages.ROLE_ID_DOES_NOT_EXISTS_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.ROLE_NAME_CAN_NOT_BE_BLANK_ERROR_CODE)
            {
              this.toastr.error(this.constants.Messages.ROLE_NAME_CAN_NOT_BE_BLANK)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.FAILED_TO_FETCH_ROLE_DATA_ERROR_CODE)
            {
              this.toastr.error(this.constants.Messages.FAILED_TO_FETCH_ROLES_DATA_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.ROLE_EXIST_ERROR_ERROR_CODE)
            {
            this.toastr.error(this.constants.Messages.ROLE_EXIST_MESSAGE)
            }
            else if(error.error.error.code === this.constants.ErrorCodes.FEATURE_ID_DOES_NOT_EXISTS_ERROR_CODE)
            {
              this.toastr.error(this.constants.Messages.FEATURE_ID_DOES_NOT_EXISTS)
            }
            else {
              this.toastr.error(this.constants.Messages.FAILED_TO_UPDATE_ROLE_MESSAGE)
            }
          }
          }
      })
    }
  }
 toggleAllCheckbox(featureId: number) {
   
    const rowControls = ['view', 'add', 'edit', 'delete'];
    const allControl = this.editRoleForm.get(`feature_${featureId}_all`);
    

    if (allControl) {
      const allCheckboxState = allControl.value;

      
      rowControls.forEach((control) => {
       
        const controlName = `feature_${featureId}_${control}`;
        const controlValue = this.editRoleForm.get(controlName);
        if (controlValue) {
          controlValue.setValue(allCheckboxState);
        }
      });

      
    }
  
    }

    toggleViewAddEditDeleteCheckbox(featureId:number){

      const viewControl = this.editRoleForm.get(`feature_${featureId}_view`);
      const addControl = this.editRoleForm.get(`feature_${featureId}_add`);
      const editControl = this.editRoleForm.get(`feature_${featureId}_edit`);
      const deleteControl = this.editRoleForm.get(`feature_${featureId}_delete`);

      const allControl = this.editRoleForm.get(`feature_${featureId}_all`);

      
      if(viewControl && viewControl.value 
        && addControl && addControl.value
        && editControl && editControl.value
        && deleteControl && deleteControl.value){
         if (allControl){
          allControl.setValue(true)
         }

      }
      else{

        if (allControl){
          allControl.setValue(false)
         }
      }
    }
}
