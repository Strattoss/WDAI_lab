import { TestBed } from '@angular/core/testing';

import { NotGuestGuard } from './not-guest.guard';

describe('NotGuestGuard', () => {
  let guard: NotGuestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotGuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
