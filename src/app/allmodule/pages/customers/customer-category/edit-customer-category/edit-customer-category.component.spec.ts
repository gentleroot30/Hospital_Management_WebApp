import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCUSTOMER_CATEGORYComponent } from './edit-customer-category.component';

describe('EditCUSTOMER_CATEGORYComponent', () => {
  let component: EditCUSTOMER_CATEGORYComponent;
  let fixture: ComponentFixture<EditCUSTOMER_CATEGORYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCUSTOMER_CATEGORYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCUSTOMER_CATEGORYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
