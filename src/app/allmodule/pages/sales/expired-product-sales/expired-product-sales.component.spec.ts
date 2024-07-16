import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredProductSalesComponent } from './expired-product-sales.component';

describe('ExpiredProductSalesComponent', () => {
  let component: ExpiredProductSalesComponent;
  let fixture: ComponentFixture<ExpiredProductSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredProductSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredProductSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
