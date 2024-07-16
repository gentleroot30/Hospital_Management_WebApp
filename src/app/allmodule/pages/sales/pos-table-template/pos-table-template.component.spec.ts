import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTableTemplateComponent } from './pos-table-template.component';

describe('PosTableTemplateComponent', () => {
  let component: PosTableTemplateComponent;
  let fixture: ComponentFixture<PosTableTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosTableTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosTableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
