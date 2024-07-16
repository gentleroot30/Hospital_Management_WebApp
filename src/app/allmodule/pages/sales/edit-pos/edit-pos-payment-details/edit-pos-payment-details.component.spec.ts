import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPosPaymentDetailsComponent } from './edit-pos-payment-details.component';

describe('EditPosPaymentDetailsComponent', () => {
  let component: EditPosPaymentDetailsComponent;
  let fixture: ComponentFixture<EditPosPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPosPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPosPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
