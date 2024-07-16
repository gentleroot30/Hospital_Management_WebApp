import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/allmodule/services/api_services/user.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  roleForm!: FormGroup;
  submitted = false;
  allFeatures: any[] = [];


  constructor(private formBuilder: FormBuilder, private api: UserService, public dialogRef: MatDialogRef<AddRoleComponent>, private toastr: ToastrService, private constants: Constants) {

  }



  onNoClick(): void {
    this.dialogRef.close();

  }


  ngOnInit(): void {
    // this.roleForm = this.formBuilder.group({
    //   roleName: ['',Validators.required,Validators.pattern(/^[A-Za-z]{1,20}$/),Validators.maxLength(20)],
    //   description: ['',Validators.required]
    // });
    this.roleForm = this.formBuilder.group({
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

    this.getAllFeatures()

  }
  getAllFeatures() {

    this.api.GetAllFeature().subscribe({
      next: (res) => {

        this.allFeatures = res.data;

        this.allFeatures.forEach(feature => {
          this.roleForm.addControl(`feature_${feature.featureId}_view`, new FormControl(false));
          this.roleForm.addControl(`feature_${feature.featureId}_add`, new FormControl(false));
          this.roleForm.addControl(`feature_${feature.featureId}_edit`, new FormControl(false));
          this.roleForm.addControl(`feature_${feature.featureId}_delete`, new FormControl(false));
          this.roleForm.addControl(`feature_${feature.featureId}_all`, new FormControl(false));
        });

      }
    })
  }

  get f() { return this.roleForm.controls; }

  AddRole() {
    // const formData = this.roleForm.value;
    // console.log('Form Data:', formData);

    const features = this.allFeatures.map(feature => {
      const featureId = feature.featureId;
      const viewControl = this.roleForm.get(`feature_${featureId}_view`);
      const addControl = this.roleForm.get(`feature_${featureId}_add`);
      const editControl = this.roleForm.get(`feature_${featureId}_edit`);
      const deleteControl = this.roleForm.get(`feature_${featureId}_delete`);
      // const allControl = this.roleForm.get(`feature_${featureId}_all`);

      return {
        featureId,
        view: viewControl ? viewControl.value : false,
        add: addControl ? addControl.value : false,
        edit: editControl ? editControl.value : false,
        delete: deleteControl ? deleteControl.value : false,
        // all: allControl ? allControl.value : false,
      };
    });

    const data = {
      roleName: this.roleForm.get('roleName')?.value,
      description: this.roleForm.get('description')?.value,
      features: features,
    };


    // api call 
    this.submitted = true;
    if (this.roleForm.valid) {
      this.api.AddUserRole(data).subscribe({
        next: () => {
          this.toastr.success(this.constants.SuccessMessages.ROLE_SAVED_MESSAGE)
          this.dialogRef.close()
        },
        error: (error) => {
          if (error.error.error) {
            if (error.error.error.code === this.constants.ErrorCodes.ROLE_ID_DOES_NOT_EXISTS_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.ROLE_ID_DOES_NOT_EXISTS_MESSAGE)
            }
            else if (error.error.error.code === this.constants.ErrorCodes.ROLE_NAME_CAN_NOT_BE_BLANK_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.ROLE_NAME_CAN_NOT_BE_BLANK)
            }
            else if (error.error.error.code === this.constants.ErrorCodes.FEATURE_ID_DOES_NOT_EXISTS_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.FEATURE_ID_DOES_NOT_EXISTS)
            }
            else if (error.error.error.code === this.constants.ErrorCodes.ROLE_EXIST_ERROR_ERROR_CODE) {
              this.toastr.error(this.constants.Messages.ROLE_EXIST_MESSAGE)
            }
            else {
              this.toastr.error(this.constants.Messages.FAILED_TO_SAVE_ROLE_MESSAGE)
            }
          }
        }
      })
    }




  }
  toggleAllCheckbox(featureId: number) {

    const rowControls = ['view', 'add', 'edit', 'delete'];
    const allControl = this.roleForm.get(`feature_${featureId}_all`);

    if (allControl) {
      const allCheckboxState = allControl.value;


      rowControls.forEach((control) => {

        const controlName = `feature_${featureId}_${control}`;
        const controlValue = this.roleForm.get(controlName);
        if (controlValue) {
          controlValue.setValue(allCheckboxState);
        }
      });


    }

  }

  toggleViewAddEditDeleteCheckbox(featureId: number) {

    const viewControl = this.roleForm.get(`feature_${featureId}_view`);
    const addControl = this.roleForm.get(`feature_${featureId}_add`);
    const editControl = this.roleForm.get(`feature_${featureId}_edit`);
    const deleteControl = this.roleForm.get(`feature_${featureId}_delete`);

    const allControl = this.roleForm.get(`feature_${featureId}_all`);

    const allValues = [viewControl, addControl, editControl, deleteControl].map(control => control?.value);
    //
    if (allValues.every(value => value === true)) {
      allControl?.setValue(true);
    } else {
      allControl?.setValue(false);
    }
    //
    if (viewControl && viewControl.value
      && addControl && addControl.value
      && editControl && editControl.value
      && deleteControl && deleteControl.value) {

      if (allControl) {
        allControl.setValue(true)
      }

    }
    else {

      if (allControl) {
        allControl.setValue(false)
      }
    }
  }
}

 