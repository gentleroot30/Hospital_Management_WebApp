import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpireProductSalesComponent } from './near-expire-product-sales.component';

describe('NearExpireProductSalesComponent', () => {
  let component: NearExpireProductSalesComponent;
  let fixture: ComponentFixture<NearExpireProductSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearExpireProductSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearExpireProductSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
