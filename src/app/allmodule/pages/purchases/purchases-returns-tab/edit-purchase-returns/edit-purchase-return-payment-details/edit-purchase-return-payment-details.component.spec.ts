import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseReturnPaymentDetailsComponent } from './edit-purchase-return-payment-details.component';

describe('EditPurchaseReturnPaymentDetailsComponent', () => {
  let component: EditPurchaseReturnPaymentDetailsComponent;
  let fixture: ComponentFixture<EditPurchaseReturnPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPurchaseReturnPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPurchaseReturnPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
