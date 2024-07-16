import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseProductDetailsComponent } from './edit-purchase-product-details.component';

describe('EditPurchaseProductDetailsComponent', () => {
  let component: EditPurchaseProductDetailsComponent;
  let fixture: ComponentFixture<EditPurchaseProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPurchaseProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPurchaseProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
