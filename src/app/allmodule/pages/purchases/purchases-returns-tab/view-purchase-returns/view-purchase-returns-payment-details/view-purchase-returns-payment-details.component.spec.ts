import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseReturnsPaymentDetailsComponent } from './view-purchase-returns-payment-details.component';

describe('ViewPurchaseReturnsPaymentDetailsComponent', () => {
  let component: ViewPurchaseReturnsPaymentDetailsComponent;
  let fixture: ComponentFixture<ViewPurchaseReturnsPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchaseReturnsPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPurchaseReturnsPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
