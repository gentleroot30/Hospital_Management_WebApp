import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductBrandComponent } from './view-product-brand.component';

describe('ViewProductBrandComponent', () => {
  let component: ViewProductBrandComponent;
  let fixture: ComponentFixture<ViewProductBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
