import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePosComponent } from './delete-pos.component';

describe('DeletePosComponent', () => {
  let component: DeletePosComponent;
  let fixture: ComponentFixture<DeletePosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
