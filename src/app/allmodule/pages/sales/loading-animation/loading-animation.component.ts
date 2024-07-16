import { Component, } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.css']
})
export class LoadingAnimationComponent {
  @Input()
  isLoading: boolean = false;
}
