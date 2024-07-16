import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPosProductDetailsComponent } from './edit-pos-product-details.component';

describe('EditPosProductDetailsComponent', () => {
  let component: EditPosProductDetailsComponent;
  let fixture: ComponentFixture<EditPosProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPosProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPosProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
