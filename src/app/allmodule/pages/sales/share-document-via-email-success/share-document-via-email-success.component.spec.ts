import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDocumentViaEmailSuccessComponent } from './share-document-via-email-success.component';

describe('ShareDocumentViaEmailSuccessComponent', () => {
  let component: ShareDocumentViaEmailSuccessComponent;
  let fixture: ComponentFixture<ShareDocumentViaEmailSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareDocumentViaEmailSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareDocumentViaEmailSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
