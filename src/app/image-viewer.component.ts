import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
//   styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
  imageData: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const base64Data = localStorage.getItem(fragment);
        if (base64Data) {
          this.imageData = base64Data;
        }
      }
    });
  }
}
