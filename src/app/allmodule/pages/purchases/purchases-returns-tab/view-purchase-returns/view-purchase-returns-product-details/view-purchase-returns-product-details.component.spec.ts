import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseReturnsProductDetailsComponent } from './view-purchase-returns-product-details.component';

describe('ViewPurchaseReturnsProductDetailsComponent', () => {
  let component: ViewPurchaseReturnsProductDetailsComponent;
  let fixture: ComponentFixture<ViewPurchaseReturnsProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchaseReturnsProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPurchaseReturnsProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
