import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseProductDetailsComponent } from './view-purchase-product-details.component';

describe('ViewPurchaseProductDetailsComponent', () => {
  let component: ViewPurchaseProductDetailsComponent;
  let fixture: ComponentFixture<ViewPurchaseProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchaseProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPurchaseProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
