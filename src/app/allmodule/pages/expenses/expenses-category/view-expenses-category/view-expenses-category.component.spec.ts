import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpensesCategoryComponent } from './view-expenses-category.component';

describe('ViewExpensesCategoryComponent', () => {
  let component: ViewExpensesCategoryComponent;
  let fixture: ComponentFixture<ViewExpensesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExpensesCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExpensesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
