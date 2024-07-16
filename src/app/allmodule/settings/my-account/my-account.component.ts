
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { HttpClient } from '@angular/common/http';
import { SettingService } from '../../services/api_services/setting.service';



@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  
})
export class MyAccountComponent implements OnInit {

  uploadStatus: any;
  selectedFile: File | null = null;
  constructor(private toastr: ToastrService, private settings: SettingService) { }


  ngOnInit(): void {
  }

  imageUrl:any;
  imageName:string|undefined;
  onFileSelected(event: any): void {
    
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader=new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload=()=>{
        this.imageUrl=reader.result;
        this.imageName=selectedFile.name;
      };     
      setTimeout(() => {
        this.uploadStatus = 'Image uploaded successfully!';
      }, 1000);



      const formData = new FormData();
      formData.append('profilePhoto', selectedFile);


      this.settings.uploadProfilePhoto(formData).subscribe(
        (response: any) => {
          this.uploadStatus = 'Image saved successfully!';
          console.log('Response:', response); 
        },
        (error: any) => {
          this.uploadStatus = 'Image saved failed!';
          console.error('Error:', error); 
        }
      );
    }
    
  }

  ac() {
    this.toastr.success('File successfully uploaded!', 'Success');
  }

  

  onSubmitPrfile(): void {
    this.onFileSelected(event);
    if (this.uploadStatus) {
      const form: FormData = new FormData();
      form.append('file', this.uploadStatus, this.uploadStatus.name);
  
      
  
      this.settings.uploadProfilePhoto(form)
        .subscribe(
          response => {
          
            this.selectedFile = null;
            this.toastr.success('File submitted successfully!'); 
            
          },
          error => {
            
            this.toastr.error('Error uploading file. Please try again.');
          }
        );
    } else {
      console.warn('No file selected.');
    }
  }
}
