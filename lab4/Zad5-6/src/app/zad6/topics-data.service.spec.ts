import { TestBed } from '@angular/core/testing';

import { TopicsDataService } from './topics-data.service';

describe('TopicsDataService', () => {
  let service: TopicsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
