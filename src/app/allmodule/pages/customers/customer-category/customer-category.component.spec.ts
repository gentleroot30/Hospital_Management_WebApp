import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOMER_CATEGORYComponent } from './customer-category.component';

describe('CUSTOMER_CATEGORYComponent', () => {
  let component: CUSTOMER_CATEGORYComponent;
  let fixture: ComponentFixture<CUSTOMER_CATEGORYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CUSTOMER_CATEGORYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CUSTOMER_CATEGORYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
