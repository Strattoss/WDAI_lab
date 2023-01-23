import { TestBed } from '@angular/core/testing';

import { TripDetailsGuard } from './trip-details.guard';

describe('TripDetailsGuard', () => {
  let guard: TripDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TripDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
