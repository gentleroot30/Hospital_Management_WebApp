import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPositionDeleteComponent } from './add-new-position-delete.component';

describe('AddNewPositionDeleteComponent', () => {
  let component: AddNewPositionDeleteComponent;
  let fixture: ComponentFixture<AddNewPositionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPositionDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPositionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
