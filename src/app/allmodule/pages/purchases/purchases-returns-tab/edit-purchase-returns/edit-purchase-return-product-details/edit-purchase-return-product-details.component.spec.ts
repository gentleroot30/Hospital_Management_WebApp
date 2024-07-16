import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseReturnProductDetailsComponent } from './edit-purchase-return-product-details.component';

describe('EditPurchaseReturnProductDetailsComponent', () => {
  let component: EditPurchaseReturnProductDetailsComponent;
  let fixture: ComponentFixture<EditPurchaseReturnProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPurchaseReturnProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPurchaseReturnProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
