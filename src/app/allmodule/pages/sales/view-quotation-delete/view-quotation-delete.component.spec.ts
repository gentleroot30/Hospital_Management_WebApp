import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuotationDeleteComponent } from './view-quotation-delete.component';

describe('ViewQuotationDeleteComponent', () => {
  let component: ViewQuotationDeleteComponent;
  let fixture: ComponentFixture<ViewQuotationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuotationDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuotationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
