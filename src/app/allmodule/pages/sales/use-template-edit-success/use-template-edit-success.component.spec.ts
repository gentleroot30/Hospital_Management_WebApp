import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseTemplateEditSuccessComponent } from './use-template-edit-success.component';

describe('UseTemplateEditSuccessComponent', () => {
  let component: UseTemplateEditSuccessComponent;
  let fixture: ComponentFixture<UseTemplateEditSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseTemplateEditSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseTemplateEditSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
