import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCUSTOMER_CATEGORYComponent } from './delete-customer-category.component';

describe('DeleteCUSTOMER_CATEGORYComponent', () => {
  let component: DeleteCUSTOMER_CATEGORYComponent;
  let fixture: ComponentFixture<DeleteCUSTOMER_CATEGORYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCUSTOMER_CATEGORYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCUSTOMER_CATEGORYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
