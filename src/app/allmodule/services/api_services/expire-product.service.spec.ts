import { TestBed } from '@angular/core/testing';

import { ExpireProductService } from './expire-product.service';

describe('ExpireProductService', () => {
  let service: ExpireProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpireProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
