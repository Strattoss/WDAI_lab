import { TestBed } from '@angular/core/testing';

import { TripsToDistinguishService } from './trips-to-distinguish.service';

describe('TripsToDistinguishService', () => {
  let service: TripsToDistinguishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsToDistinguishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
