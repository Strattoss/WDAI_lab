import { TestBed } from '@angular/core/testing';

import { DeliverTopicService } from './deliver-topic.service';

describe('DeliverTopicService', () => {
  let service: DeliverTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
