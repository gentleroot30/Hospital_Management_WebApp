import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDocumentComponent } from './purchase-document.component';

describe('PurchaseDocumentComponent', () => {
  let component: PurchaseDocumentComponent;
  let fixture: ComponentFixture<PurchaseDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
