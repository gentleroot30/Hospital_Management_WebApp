import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchasesReturnsComponent } from './edit-purchases-returns.component';

describe('EditPurchasesReturnsComponent', () => {
  let component: EditPurchasesReturnsComponent;
  let fixture: ComponentFixture<EditPurchasesReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPurchasesReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPurchasesReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
