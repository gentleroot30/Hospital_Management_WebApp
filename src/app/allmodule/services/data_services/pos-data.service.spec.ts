import { TestBed } from '@angular/core/testing';
import { PosDataService } from './pos-data.service';


describe('PosDataService', () => {
  let service: PosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
