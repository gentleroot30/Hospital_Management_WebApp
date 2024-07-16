import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasesReturnsComponent } from './add-purchases-returns.component';

describe('AddPurchasesReturnsComponent', () => {
  let component: AddPurchasesReturnsComponent;
  let fixture: ComponentFixture<AddPurchasesReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchasesReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchasesReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
