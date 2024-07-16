import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseReturnProductDetailsComponent } from './add-purchase-return-product-details.component';

describe('AddPurchaseReturnProductDetailsComponent', () => {
  let component: AddPurchaseReturnProductDetailsComponent;
  let fixture: ComponentFixture<AddPurchaseReturnProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseReturnProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchaseReturnProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
