import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseReturnPaymentDetailsComponent } from './add-purchase-return-payment-details.component';

describe('AddPurchaseReturnPaymentDetailsComponent', () => {
  let component: AddPurchaseReturnPaymentDetailsComponent;
  let fixture: ComponentFixture<AddPurchaseReturnPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseReturnPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchaseReturnPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
