import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredStockOrderSuccessComponent } from './expired-stock-order-success.component';

describe('ExpiredStockOrderSuccessComponent', () => {
  let component: ExpiredStockOrderSuccessComponent;
  let fixture: ComponentFixture<ExpiredStockOrderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredStockOrderSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredStockOrderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
