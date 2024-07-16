import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQUOTATION_TEMPLATEDeleteComponent } from './add-quotation-template-delete.component';

describe('AddQUOTATION_TEMPLATEDeleteComponent', () => {
  let component: AddQUOTATION_TEMPLATEDeleteComponent;
  let fixture: ComponentFixture<AddQUOTATION_TEMPLATEDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQUOTATION_TEMPLATEDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQUOTATION_TEMPLATEDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
