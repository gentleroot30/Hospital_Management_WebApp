import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuotationTemplateComponent } from './add-quotation-template.component'; // Assuming correct path

describe('AddQUOTATION_TEMPLATEComponent', () => {
  let component: AddQuotationTemplateComponent ;
  let fixture: ComponentFixture<AddQuotationTemplateComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQuotationTemplateComponent  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuotationTemplateComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});