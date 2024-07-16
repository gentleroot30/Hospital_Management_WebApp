import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowStockSalesComponent } from './low-stock-sales.component';

describe('LowStockSalesComponent', () => {
  let component: LowStockSalesComponent;
  let fixture: ComponentFixture<LowStockSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowStockSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowStockSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
