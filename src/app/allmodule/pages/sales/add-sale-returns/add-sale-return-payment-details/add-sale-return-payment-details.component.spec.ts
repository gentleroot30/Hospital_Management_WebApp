import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaleReturnPaymentDetailsComponent } from './add-sale-return-payment-details.component';

describe('AddSaleReturnPaymentDetailsComponent', () => {
  let component: AddSaleReturnPaymentDetailsComponent;
  let fixture: ComponentFixture<AddSaleReturnPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSaleReturnPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSaleReturnPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
