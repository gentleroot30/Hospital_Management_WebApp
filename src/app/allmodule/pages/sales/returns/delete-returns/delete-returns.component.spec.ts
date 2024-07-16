import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReturnsComponent } from './delete-returns.component';

describe('DeleteReturnsComponent', () => {
  let component: DeleteReturnsComponent;
  let fixture: ComponentFixture<DeleteReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
