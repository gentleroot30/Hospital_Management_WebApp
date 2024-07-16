import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTemplateDeleteSuccessComponent } from './quotation-template-delete-success.component';

describe('QuotationTemplateDeleteSuccessComponent', () => {
  let component: QuotationTemplateDeleteSuccessComponent;
  let fixture: ComponentFixture<QuotationTemplateDeleteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationTemplateDeleteSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationTemplateDeleteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
