import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QUOTATION_TEMPLATEComponent } from './quotation-template.component';

describe('QUOTATION_TEMPLATEComponent', () => {
  let component: QUOTATION_TEMPLATEComponent;
  let fixture: ComponentFixture<QUOTATION_TEMPLATEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QUOTATION_TEMPLATEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QUOTATION_TEMPLATEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
