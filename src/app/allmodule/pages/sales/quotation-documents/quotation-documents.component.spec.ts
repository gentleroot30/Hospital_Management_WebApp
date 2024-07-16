import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationDocumentsComponent } from './quotation-documents.component';

describe('QuotationDocumentsComponent', () => {
  let component: QuotationDocumentsComponent;
  let fixture: ComponentFixture<QuotationDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
