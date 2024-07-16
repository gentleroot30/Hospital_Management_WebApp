import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowStockOrderSuccessComponent } from './low-stock-order-success.component';

describe('LowStockOrderSuccessComponent', () => {
  let component: LowStockOrderSuccessComponent;
  let fixture: ComponentFixture<LowStockOrderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowStockOrderSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowStockOrderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
