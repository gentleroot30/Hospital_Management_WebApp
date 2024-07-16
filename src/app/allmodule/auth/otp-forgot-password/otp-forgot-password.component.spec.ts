import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpForgotPasswordComponent } from './otp-forgot-password.component';

describe('OtpForgotPasswordComponent', () => {
  let component: OtpForgotPasswordComponent;
  let fixture: ComponentFixture<OtpForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpForgotPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
