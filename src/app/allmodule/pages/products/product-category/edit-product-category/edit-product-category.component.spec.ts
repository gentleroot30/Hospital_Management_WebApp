import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPRODUCT_CATEGORYComponent } from './edit-product-category.component';

describe('EditPRODUCT_CATEGORYComponent', () => {
  let component: EditPRODUCT_CATEGORYComponent;
  let fixture: ComponentFixture<EditPRODUCT_CATEGORYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPRODUCT_CATEGORYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPRODUCT_CATEGORYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
