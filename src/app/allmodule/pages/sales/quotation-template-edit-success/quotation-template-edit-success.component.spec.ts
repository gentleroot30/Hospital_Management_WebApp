import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTemplateEditSuccessComponent } from './quotation-template-edit-success.component';

describe('QuotationTemplateEditSuccessComponent', () => {
  let component: QuotationTemplateEditSuccessComponent;
  let fixture: ComponentFixture<QuotationTemplateEditSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationTemplateEditSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationTemplateEditSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
