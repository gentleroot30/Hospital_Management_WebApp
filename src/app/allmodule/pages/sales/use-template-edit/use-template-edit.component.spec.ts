import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseTemplateEditComponent } from './use-template-edit.component';

describe('UseTemplateEditComponent', () => {
  let component: UseTemplateEditComponent;
  let fixture: ComponentFixture<UseTemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseTemplateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
