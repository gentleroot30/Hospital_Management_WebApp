import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasesTabComponent } from './add-purchases-tab.component';

describe('AddPurchasesTabComponent', () => {
  let component: AddPurchasesTabComponent;
  let fixture: ComponentFixture<AddPurchasesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchasesTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchasesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
