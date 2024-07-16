import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnsComponent } from './add-returns.component';

describe('AddReturnsComponent', () => {
  let component: AddReturnsComponent;
  let fixture: ComponentFixture<AddReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
