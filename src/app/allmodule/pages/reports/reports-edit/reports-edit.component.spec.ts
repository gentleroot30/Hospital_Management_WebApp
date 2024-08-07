import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsEditComponent } from './reports-edit.component';

describe('ReportsEditComponent', () => {
  let component: ReportsEditComponent;
  let fixture: ComponentFixture<ReportsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
