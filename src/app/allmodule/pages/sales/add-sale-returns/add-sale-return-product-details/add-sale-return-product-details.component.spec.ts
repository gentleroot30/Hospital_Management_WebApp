import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaleReturnProductDetailsComponent } from './add-sale-return-product-details.component';

describe('AddSaleReturnProductDetailsComponent', () => {
  let component: AddSaleReturnProductDetailsComponent;
  let fixture: ComponentFixture<AddSaleReturnProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSaleReturnProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSaleReturnProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
