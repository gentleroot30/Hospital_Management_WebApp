import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaleReturnsProductDetailsComponent } from './view-sale-returns-product-details.component';

describe('ViewSaleReturnsProductDetailsComponent', () => {
  let component: ViewSaleReturnsProductDetailsComponent;
  let fixture: ComponentFixture<ViewSaleReturnsProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSaleReturnsProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSaleReturnsProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
