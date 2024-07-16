import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuotationComponent } from './delete-quotation.component';

describe('DeleteQuotationComponent', () => {
  let component: DeleteQuotationComponent;
  let fixture: ComponentFixture<DeleteQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
