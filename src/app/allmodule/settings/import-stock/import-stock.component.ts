import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router'; 
import { SettingService } from '../../services/api_services/setting.service';


@Component({
  selector: 'app-import-stock',
  templateUrl: './import-stock.component.html',
  styleUrls: ['./import-stock.component.css'],
})

export class ImportStockComponent implements OnInit {
  selectedFile: File | null = null;
  uploadStatus: string = '';
  upload: string = '';
  fileUploaded: boolean = false;


  constructor(private http: HttpClient ,  private toastr: ToastrService , private router: Router ,  private settingService: SettingService ) { }

  ngOnInit(): void {
  }
  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
     
      if (selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.xlsx')) {
        this.selectedFile = selectedFile;
      } else {
        this.toastr.error('Only Excel files are allowed!'); 
      }
    }
  }

  onFile(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Simulate a successful upload (replace this with your actual upload logic)
      // For demonstration purposes, let's assume the upload is successful after 2 seconds.
      setTimeout(() => {
        alert('Document uploaded successfully!');
      }, 2000);
    }
  }

  // uploadFile(): void {
  //   if (this.selectedFile) {
  //     const formData: FormData = new FormData();
  //     formData.append('file', this.selectedFile, this.selectedFile.name);

  //     // Update the URL to your backend API endpoint
  //     this.http.post('https://localhost:44379/api/AccountSettings/UploadImportStockFile', formData, {
  //       headers: {
  //         'userId': '1' // Add the user ID header if required by your API
  //       }
  //     }).subscribe(
  //       response => {
  //         console.log('File uploaded successfully:', response);
  //         this.selectedFile = null; // Clear selected file after successful upload
  //         this.toastr.success('File submitted successfully!'); // Display success toast
  //         this.router.navigate(['/account']);
  //       },
  //       error => {
  //         console.error('Error uploading file:', error);
  //         alert('Error uploading file. Please try again.');
  //       }
  //     );
  //   } else {
  //     console.warn('No file selected.');
  //   }
  // }
  uploadFile(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
  
      
  
      this.settingService.uploadImportStock(formData)
        .subscribe(
          response => {
          
            this.selectedFile = null;
            this.toastr.success('File submitted successfully!'); 
            this.router.navigate(['/account']);
          },
          error => {
            
            this.toastr.error('Error uploading file. Please try again.');
          }
        );
    } else {
      console.warn('No file selected.');
    }
  }

  clearSelectedFile(): void {
    this.selectedFile = null; 
    this.toastr.success('File removed successfully!'); 
  }

  // downloadTemplate(): void {
  //   const url = 'https://localhost:44379/api/AccountSettings/DownloadImportStockTemplate';
  //   const link = document.createElement('a'); 
  //   console.log(`Download initiated: ${url}`);

  //   this.http.post(url, {}, { observe: 'response', responseType: 'blob' })
  //     .subscribe(response => {
  //       const filename = response.headers.get('content-disposition');
  //       if (filename) {
  //         // Extract filename from content disposition header (logic might vary)
  //         const filenameParts = filename.split(';');
  //         const actualFilename = filenameParts.find(part => part.trim().startsWith('filename='));
  //         if (actualFilename) {
  //           const dynamicFilename = actualFilename.split('=')[1].trim();
  //           link.download = dynamicFilename;
  //         }
  //         else {
  //           // Use default filename if content disposition doesn't provide one
  //           link.download = 'excelfile.xlsx';
  //         }
  //       }
  //       else {
  //         // Use default filename if no content disposition header
  //         link.download = 'excelfile.xlsx';
  //       }
  //       console.log(`Download completed: ${url} - Filename: ${link.download}`);
  //     },
  //     error => {
  //       console.error('Download error:', error); // Handle errors
  //       this.toastr.error('error!'); 

  //     });
  
  //   }

  }

