import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPosProductDetailsComponent } from './add-pos-product-details.component';

describe('AddPosProductDetailsComponent', () => {
  let component: AddPosProductDetailsComponent;
  let fixture: ComponentFixture<AddPosProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPosProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPosProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
