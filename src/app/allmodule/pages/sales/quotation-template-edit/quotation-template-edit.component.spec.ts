import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTemplateEditComponent } from './quotation-template-edit.component';

describe('QuotationTemplateEditComponent', () => {
  let component: QuotationTemplateEditComponent;
  let fixture: ComponentFixture<QuotationTemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationTemplateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
