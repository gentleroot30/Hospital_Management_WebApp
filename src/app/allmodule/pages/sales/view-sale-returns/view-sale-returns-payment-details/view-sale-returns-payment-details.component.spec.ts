import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaleReturnsPaymentDetailsComponent } from './view-sale-returns-payment-details.component';

describe('ViewSaleReturnsPaymentDetailsComponent', () => {
  let component: ViewSaleReturnsPaymentDetailsComponent;
  let fixture: ComponentFixture<ViewSaleReturnsPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSaleReturnsPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSaleReturnsPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
