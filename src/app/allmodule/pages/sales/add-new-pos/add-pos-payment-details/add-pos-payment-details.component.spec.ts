import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPosPaymentDetailsComponent } from './add-pos-payment-details.component';

describe('AddPosPaymentDetailsComponent', () => {
  let component: AddPosPaymentDetailsComponent;
  let fixture: ComponentFixture<AddPosPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPosPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPosPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
