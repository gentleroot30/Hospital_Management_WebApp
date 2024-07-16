import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaleReturnsPaymentDetailsComponent } from './edit-sale-returns-payment-details.component';

describe('EditSaleReturnsPaymentDetailsComponent', () => {
  let component: EditSaleReturnsPaymentDetailsComponent;
  let fixture: ComponentFixture<EditSaleReturnsPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSaleReturnsPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSaleReturnsPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
