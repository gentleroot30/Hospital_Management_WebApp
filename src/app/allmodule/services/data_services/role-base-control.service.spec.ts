import { TestBed } from '@angular/core/testing';

import { RoleBaseControlService } from './role-base-control.service';

describe('RoleBaseControlService', () => {
  let service: RoleBaseControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleBaseControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
