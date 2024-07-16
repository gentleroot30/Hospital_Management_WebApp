import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaleReturnProductDetailsComponent } from './edit-sale-return-product-details.component';

describe('EditSaleReturnProductDetailsComponent', () => {
  let component: EditSaleReturnProductDetailsComponent;
  let fixture: ComponentFixture<EditSaleReturnProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSaleReturnProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSaleReturnProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
