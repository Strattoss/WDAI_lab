import { TestBed } from '@angular/core/testing';

import { FbDatabaseService } from './fb-database.service';

describe('FbDatabaseService', () => {
  let service: FbDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
