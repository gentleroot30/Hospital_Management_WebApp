import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePurchasesReturnsComponent } from './delete-purchases-returns.component';

describe('DeletePurchasesReturnsComponent', () => {
  let component: DeletePurchasesReturnsComponent;
  let fixture: ComponentFixture<DeletePurchasesReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePurchasesReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePurchasesReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
