import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchasePaymentDetailsComponent } from './view-purchase-payment-details.component';

describe('ViewPurchasePaymentDetailsComponent', () => {
  let component: ViewPurchasePaymentDetailsComponent;
  let fixture: ComponentFixture<ViewPurchasePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchasePaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPurchasePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
