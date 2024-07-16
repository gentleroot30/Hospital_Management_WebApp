import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpiryProductsComponent } from './near-expiry-products.component';

describe('NearExpiryProductsComponent', () => {
  let component: NearExpiryProductsComponent;
  let fixture: ComponentFixture<NearExpiryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearExpiryProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearExpiryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
