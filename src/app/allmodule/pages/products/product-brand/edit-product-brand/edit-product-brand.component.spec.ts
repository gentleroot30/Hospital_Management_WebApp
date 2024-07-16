import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductBrandComponent } from './edit-product-brand.component';

describe('EditProductBrandComponent', () => {
  let component: EditProductBrandComponent;
  let fixture: ComponentFixture<EditProductBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
