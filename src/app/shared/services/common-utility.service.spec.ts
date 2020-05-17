import { TestBed } from '@angular/core/testing';

import { CommonUtilityService } from './common-utility.service';

describe('CommonUtilityService', () => {
  let service: CommonUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
