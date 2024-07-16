import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSaleReturnComponent } from './delete-sale-return.component';

describe('DeleteSaleReturnComponent', () => {
  let component: DeleteSaleReturnComponent;
  let fixture: ComponentFixture<DeleteSaleReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSaleReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSaleReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
