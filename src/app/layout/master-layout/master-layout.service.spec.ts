import { TestBed } from '@angular/core/testing';

import { MasterLayoutService } from './master-layout.service';

describe('MasterLayoutService', () => {
  let service: MasterLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
