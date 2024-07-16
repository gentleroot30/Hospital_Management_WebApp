import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesReturnsTabComponent } from './purchases-returns-tab.component';

describe('PurchasesReturnsTabComponent', () => {
  let component: PurchasesReturnsTabComponent;
  let fixture: ComponentFixture<PurchasesReturnsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesReturnsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesReturnsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
