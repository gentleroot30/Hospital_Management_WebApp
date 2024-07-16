import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuotationDeleteSuccessComponent } from './view-quotation-delete-success.component';

describe('ViewQuotationDeleteSuccessComponent', () => {
  let component: ViewQuotationDeleteSuccessComponent;
  let fixture: ComponentFixture<ViewQuotationDeleteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuotationDeleteSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuotationDeleteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
