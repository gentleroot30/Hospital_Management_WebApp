import { TestBed } from '@angular/core/testing';

import { SaleReturnDataService } from './sale-return-data.service';

describe('SaleReturnDataService', () => {
  let service: SaleReturnDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleReturnDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
