import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPositionFinalisePaymentComponent } from './add-new-position-finalise-payment.component';

describe('AddNewPositionFinalisePaymentComponent', () => {
  let component: AddNewPositionFinalisePaymentComponent;
  let fixture: ComponentFixture<AddNewPositionFinalisePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPositionFinalisePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPositionFinalisePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
