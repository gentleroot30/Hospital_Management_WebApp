import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseTemplateConfirmComponent } from './use-template-confirmation.component';

describe('UseTemplateAddComponent', () => {
  let component: UseTemplateConfirmComponent;
  let fixture: ComponentFixture<UseTemplateConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseTemplateConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseTemplateConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
