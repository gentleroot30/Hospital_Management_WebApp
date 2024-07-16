import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotationSuccessComponent } from './edit-quotation-success.component';

describe('EditQuotationSuccessComponent', () => {
  let component: EditQuotationSuccessComponent;
  let fixture: ComponentFixture<EditQuotationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuotationSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuotationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
