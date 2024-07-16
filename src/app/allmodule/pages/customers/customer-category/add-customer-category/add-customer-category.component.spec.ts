import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerCategoryComponent } from './add-customer-category.component';

describe('AddCustomerCategoryComponent', () => {
  let component: AddCustomerCategoryComponent;
  let fixture: ComponentFixture<AddCustomerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
