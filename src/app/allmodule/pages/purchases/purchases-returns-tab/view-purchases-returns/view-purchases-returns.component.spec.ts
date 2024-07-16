import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchasesReturnsComponent } from './view-purchases-returns.component';

describe('ViewPurchasesReturnsComponent', () => {
  let component: ViewPurchasesReturnsComponent;
  let fixture: ComponentFixture<ViewPurchasesReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchasesReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPurchasesReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
