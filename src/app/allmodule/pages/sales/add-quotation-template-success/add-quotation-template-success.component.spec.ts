import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuotationTemplateSuccessComponent } from './add-quotation-template-success.component';

describe('AddQuotationTemplateSuccessComponent', () => {
  let component: AddQuotationTemplateSuccessComponent;
  let fixture: ComponentFixture<AddQuotationTemplateSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuotationTemplateSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuotationTemplateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
