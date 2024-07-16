import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuotationSuccessComponent } from './add-quotation-success.component';

describe('AddQuotationSuccessComponent', () => {
  let component: AddQuotationSuccessComponent;
  let fixture: ComponentFixture<AddQuotationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuotationSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuotationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
