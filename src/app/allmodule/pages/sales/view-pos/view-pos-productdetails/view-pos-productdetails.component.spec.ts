import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPosProductdetailsComponent } from './view-pos-productdetails.component';

describe('ViewPosProductdetailsComponent', () => {
  let component: ViewPosProductdetailsComponent;
  let fixture: ComponentFixture<ViewPosProductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPosProductdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPosProductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
