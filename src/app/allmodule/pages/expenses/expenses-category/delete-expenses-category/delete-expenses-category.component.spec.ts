import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExpensesCategoryComponent } from './delete-expenses-category.component';

describe('DeleteExpensesCategoryComponent', () => {
  let component: DeleteExpensesCategoryComponent;
  let fixture: ComponentFixture<DeleteExpensesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteExpensesCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteExpensesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
