import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QUOTATION_TEMPLATEDeleteComponent } from './quotation-template-delete.component';

describe('QUOTATION_TEMPLATEDeleteComponent', () => {
  let component: QUOTATION_TEMPLATEDeleteComponent;
  let fixture: ComponentFixture<QUOTATION_TEMPLATEDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QUOTATION_TEMPLATEDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QUOTATION_TEMPLATEDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
