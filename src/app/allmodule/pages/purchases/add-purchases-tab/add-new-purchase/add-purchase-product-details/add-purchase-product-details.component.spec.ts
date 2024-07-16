import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseProductDetailsComponent } from './add-purchase-product-details.component';

describe('AddPurchaseProductDetailsComponent', () => {
  let component: AddPurchaseProductDetailsComponent;
  let fixture: ComponentFixture<AddPurchaseProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchaseProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
