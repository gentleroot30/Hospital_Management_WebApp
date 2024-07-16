import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsSuccessComponent } from './send-sms-success.component';

describe('SendSmsSuccessComponent', () => {
  let component: SendSmsSuccessComponent;
  let fixture: ComponentFixture<SendSmsSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSmsSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendSmsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
