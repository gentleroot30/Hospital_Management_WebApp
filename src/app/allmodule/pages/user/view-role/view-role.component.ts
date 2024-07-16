import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {

  viewRoleForm!: FormGroup;
  submitted = false;
  editdata: any;
  allFeatures:any[]=[];
  constructor(
    private formBuilder: FormBuilder,private api:UserService,public dialogRef:MatDialogRef<ViewRoleComponent> 
    ,@Inject(MAT_DIALOG_DATA) public data:any)
   {  
    this.editdata=data;
   }
   onNoClick(): void {
    this.dialogRef.close();
   
  }
  ngOnInit(): void {
    this.viewRoleForm = this.formBuilder.group({
      roleName: [''],
      description: [''],

		});
    this.api.GetRoleById(this.editdata).subscribe({  
      next:(res)=>{
      this.allFeatures = res.data[0].features;

      // this.allFeatures.forEach(feature => {
      //   this.viewRoleForm.addControl(`feature_${feature.featureId}_view`, new FormControl(feature.view));
      //   this.viewRoleForm.addControl(`feature_${feature.featureId}_add`, new FormControl(feature.add));
      //   this.viewRoleForm.addControl(`feature_${feature.featureId}_edit`, new FormControl(feature.edit));
      //   this.viewRoleForm.addControl(`feature_${feature.featureId}_delete`, new FormControl(feature.delete));
      //   this.viewRoleForm.addControl(`feature_${feature.featureId}_all`, new FormControl(feature.all));
      // });

      this.allFeatures.forEach(feature => {
        this.viewRoleForm.addControl(`feature_${feature.featureId}_view`, new FormControl(feature.view));
        this.viewRoleForm.addControl(`feature_${feature.featureId}_add`, new FormControl(feature.add));
        this.viewRoleForm.addControl(`feature_${feature.featureId}_edit`, new FormControl(feature.edit));
        this.viewRoleForm.addControl(`feature_${feature.featureId}_delete`, new FormControl(feature.delete));
        
      
        // Check if all feature controls are true, if yes, set all control to true
        if (feature.view && feature.add && feature.edit && feature.delete) {
          feature.all=true;
        }
        this.viewRoleForm.addControl(`feature_${feature.featureId}_all`, new FormControl(feature.all));
      });
      
      this.viewRoleForm.addControl(`roleId`, new FormControl(res.data[0].roleId)); 
     
      this.viewRoleForm.patchValue({ 
        roleName: res.data[0].roleName,
        description:res.data[0].description,
      })
      // this.editRoleForm.patchValue({ roleName: res.data[0].roleName });
      // this.editRoleForm.patchValue({ description: res.data[0].description });



    

      
    },
      })

  }


  get f() { return this.viewRoleForm.controls; }

  viewrole(){
    this.submitted = true;
    if(!this.viewRoleForm.valid){
       return;
    }
  }
  toggleAllCheckbox(featureId: number) {
    
     const rowControls = ['view', 'add', 'edit', 'delete'];
     const allControl = this.viewRoleForm.get(`feature_${featureId}_all`);
 
     if (allControl) {
       const allCheckboxState = allControl.value;
 
       
       rowControls.forEach((control) => {
        
         const controlName = `feature_${featureId}_${control}`;
         const controlValue = this.viewRoleForm.get(controlName);
         if (controlValue) {
           controlValue.setValue(allCheckboxState);
         }
       });
 
       
     }
   
     }
 
     toggleViewAddEditDeleteCheckbox(featureId:number){
 
       const viewControl = this.viewRoleForm.get(`feature_${featureId}_view`);
       const addControl = this.viewRoleForm.get(`feature_${featureId}_add`);
       const editControl = this.viewRoleForm.get(`feature_${featureId}_edit`);
       const deleteControl = this.viewRoleForm.get(`feature_${featureId}_delete`);
 
       const allControl = this.viewRoleForm.get(`feature_${featureId}_all`);
 
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
