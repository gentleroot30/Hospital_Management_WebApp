import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReturnsComponent } from './edit-returns.component';

describe('EditReturnsComponent', () => {
  let component: EditReturnsComponent;
  let fixture: ComponentFixture<EditReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
