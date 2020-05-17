import { TestBed } from '@angular/core/testing';

import { SecurityUtilityService } from './security-utility.service';

describe('SecurityUtilityService', () => {
  let service: SecurityUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
