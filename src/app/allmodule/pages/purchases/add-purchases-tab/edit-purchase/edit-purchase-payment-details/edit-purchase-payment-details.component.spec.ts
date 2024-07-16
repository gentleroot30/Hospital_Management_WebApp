import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchasePaymentDetailsComponent } from './edit-purchase-payment-details.component';

describe('EditPurchasePaymentDetailsComponent', () => {
  let component: EditPurchasePaymentDetailsComponent;
  let fixture: ComponentFixture<EditPurchasePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPurchasePaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPurchasePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
