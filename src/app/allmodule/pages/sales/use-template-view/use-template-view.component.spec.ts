import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseTemplateViewComponent } from './use-template-view.component';

describe('UseTemplateViewComponent', () => {
  let component: UseTemplateViewComponent;
  let fixture: ComponentFixture<UseTemplateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseTemplateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseTemplateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
