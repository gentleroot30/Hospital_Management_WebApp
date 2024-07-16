import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCUSTOMER_CATEGORYComponent } from './view-customer-category.component';

describe('ViewCUSTOMER_CATEGORYComponent', () => {
  let component: ViewCUSTOMER_CATEGORYComponent;
  let fixture: ComponentFixture<ViewCUSTOMER_CATEGORYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCUSTOMER_CATEGORYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCUSTOMER_CATEGORYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
