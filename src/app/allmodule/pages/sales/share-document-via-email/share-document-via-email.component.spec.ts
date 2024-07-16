import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDocumentViaEmailComponent } from './share-document-via-email.component';

describe('ShareDocumentViaEmailComponent', () => {
  let component: ShareDocumentViaEmailComponent;
  let fixture: ComponentFixture<ShareDocumentViaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareDocumentViaEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareDocumentViaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
