import { TestBed } from '@angular/core/testing';

import { TotalNumOfReservationsService } from './total-num-of-reservations.service';

describe('TotalNumOfReservationsService', () => {
  let service: TotalNumOfReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalNumOfReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
