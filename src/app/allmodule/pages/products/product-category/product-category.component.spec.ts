import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRODUCT_CATEGORYComponent } from './product-category.component';

describe('PRODUCT_CATEGORYComponent', () => {
  let component: PRODUCT_CATEGORYComponent;
  let fixture: ComponentFixture<PRODUCT_CATEGORYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PRODUCT_CATEGORYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PRODUCT_CATEGORYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
