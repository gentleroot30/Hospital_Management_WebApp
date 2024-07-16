import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseTemplateDeleteSuccessComponent } from './use-template-delete-success.component';

describe('UseTemplateDeleteSuccessComponent', () => {
  let component: UseTemplateDeleteSuccessComponent;
  let fixture: ComponentFixture<UseTemplateDeleteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseTemplateDeleteSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseTemplateDeleteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
