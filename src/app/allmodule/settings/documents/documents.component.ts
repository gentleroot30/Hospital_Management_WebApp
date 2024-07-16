import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../../services/api_services/settings.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  submitted: boolean | undefined;
  
 
  

  
 
  documentData: any = {}; 
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private settings: SettingsService, private router: Router, private toastr: ToastrService, private constants: Constants) { }
  ngOnInit(): void {
    
  }

  formData: any = {};
  showContent: boolean = true;
  selectedFile: File | null = null;
  uploadedFile: File | null = null;
  isImage: boolean = false;
  isPdf: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  maxFileSize: number = 5 * 1024 * 1024; 

  uploadedFilee: File | null = null;
  isImagee: boolean = false;
  isPdff: boolean = false;
  imageUrll: string | ArrayBuffer | null = null;

  
  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file && file.size <= this.maxFileSize) {
      this.uploadedFile = file;
    

      if (file.type.startsWith('image/')) {
        this.isImage = true;
        this.isPdf = false;
        this.imageUrl = null; 
        this.previewImage(file);
      } else if (file.type === 'application/pdf') {
        this.isPdf = true;
        this.isImage = false;
        this.imageUrl = null; 
      } else {
        this.isImage = false;
        this.isPdf = false;
        this.imageUrl = null; 
      }
      }else {
       
        this.showSnackbar('File size exceeds the limit.');
        

    }
    this.up();
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000 
    });
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }
  onDelete() {
    this.uploadedFile = null;
    
  }
  onDel() {
    this.uploadedFilee = null;
    
  }

  onFileSelecteed(event: any) {
    const file:File = event.target.files[0];
    if (file && file.size <= this.maxFileSize) {
      this.uploadedFilee = file;
      if (file.type.startsWith('image/')) {
        this.isImagee = true;
        this.isPdff = false;
        this.imageUrll = null; 
        this.previewImagee(file);
      } else if (file.type === 'application/pdf') {
        this.isPdff = true;
        this.isImagee = false;
        this.imageUrll = null; 
      } else {
        this.isImagee = false;
        this.isPdff = false;
        this.imageUrll = null; 
      }
    }else {
    
      this.showSnackbar('File size exceeds the limit.');
      

  }
  this.up();
  }

  previewImagee(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrll = reader.result;
    };
  }


  onSubmitHeader(): void {
    if (this.uploadedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.uploadedFile, this.uploadedFile.name);
  
      
  
      this.settings.uploadHeader(formData)
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


  onSubmitFooter(): void{
    if (this.uploadedFilee) {
      const formData: FormData = new FormData();
      formData.append('file', this.uploadedFilee, this.uploadedFilee.name);
  
      
  
      this.settings.uploadFooter(formData)
        .subscribe(
          response => {
          
            this.selectedFile = null;
           
          },
          error => {
            
            this.toastr.error('Error uploading file. Please try again.');
          }
        );
    } else {
      console.warn('No file selected.');
    }
  }
  
  combinedMethod() {
    this.onSubmitHeader();
    this.onSubmitFooter();
   

    
  }

  sub() {
    this.toastr.success('File Submited Successfully!', 'Success');
  }

  up() {
    this.toastr.success('File successfully uploaded!', 'Success');
  }
  
  secondMethod(){
    window.location.reload();
  }

  comb(){
    this.combinedMethod();
    setTimeout(() => {
      this.secondMethod();
    }, 3000);
  
    
    
  }
}

  
  
 
 
  



