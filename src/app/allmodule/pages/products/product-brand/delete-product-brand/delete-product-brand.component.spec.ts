import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductBrandComponent } from './delete-product-brand.component';

describe('DeleteProductBrandComponent', () => {
  let component: DeleteProductBrandComponent;
  let fixture: ComponentFixture<DeleteProductBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
