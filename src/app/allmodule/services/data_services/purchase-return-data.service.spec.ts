import { TestBed } from '@angular/core/testing';

import { PurchaseReturnDataService } from './purchase-return-data.service';

describe('PurchaseReturnDataService', () => {
  let service: PurchaseReturnDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseReturnDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
