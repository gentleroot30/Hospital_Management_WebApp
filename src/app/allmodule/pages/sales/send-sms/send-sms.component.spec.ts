import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/allmodule/pages/sales/send-sms/send-sms.component.spec.ts
import { SendSmsComponent } from './send-sms.component';

describe('SendSmsComponent', () => {
  let component: SendSmsComponent;
  let fixture: ComponentFixture<SendSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendSmsComponent);
========
import { EditPosComponent } from './edit-pos.component';

describe('EditPosComponent', () => {
  let component: EditPosComponent;
  let fixture: ComponentFixture<EditPosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPosComponent);
>>>>>>>> 38df0980aa97c9b628e14cf4d2713e1713663849:src/app/allmodule/pages/sales/edit-pos/edit-pos.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
