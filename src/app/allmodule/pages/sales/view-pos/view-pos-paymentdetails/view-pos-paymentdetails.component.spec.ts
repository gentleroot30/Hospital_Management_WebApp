import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPosPaymentdetailsComponent } from './view-pos-paymentdetails.component';

describe('ViewPosPaymentdetailsComponent', () => {
  let component: ViewPosPaymentdetailsComponent;
  let fixture: ComponentFixture<ViewPosPaymentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPosPaymentdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPosPaymentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
