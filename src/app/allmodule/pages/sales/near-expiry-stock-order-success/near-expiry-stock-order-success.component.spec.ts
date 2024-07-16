import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpiryStockOrderSuccessComponent } from './near-expiry-stock-order-success.component';

describe('NearExpiryStockOrderSuccessComponent', () => {
  let component: NearExpiryStockOrderSuccessComponent;
  let fixture: ComponentFixture<NearExpiryStockOrderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearExpiryStockOrderSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearExpiryStockOrderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
