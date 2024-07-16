import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasePaymentDetailsComponent } from './add-purchase-payment-details.component';

describe('AddPurchasePaymentDetailsComponent', () => {
  let component: AddPurchasePaymentDetailsComponent;
  let fixture: ComponentFixture<AddPurchasePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchasePaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchasePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
