import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpensesCategoryComponent } from './edit-expenses-category.component';

describe('EditExpensesCategoryComponent', () => {
  let component: EditExpensesCategoryComponent;
  let fixture: ComponentFixture<EditExpensesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExpensesCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExpensesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
