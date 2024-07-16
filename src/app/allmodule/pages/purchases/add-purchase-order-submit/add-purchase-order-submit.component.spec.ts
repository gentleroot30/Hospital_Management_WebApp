import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseOrderSubmitComponent } from './add-purchase-order-submit.component';

describe('AddPurchaseOrderSubmitComponent', () => {
  let component: AddPurchaseOrderSubmitComponent;
  let fixture: ComponentFixture<AddPurchaseOrderSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseOrderSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchaseOrderSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
