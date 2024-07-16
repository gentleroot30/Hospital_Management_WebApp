import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaleReturnComponent } from './view-sale-return.component';

describe('ViewSaleReturnComponent', () => {
  let component: ViewSaleReturnComponent;
  let fixture: ComponentFixture<ViewSaleReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSaleReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSaleReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
