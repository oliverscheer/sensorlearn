import { TestBed } from '@angular/core/testing';

import { EventhubsignalrService } from './eventhubsignalr.service';

describe('EventhubsignalrService', () => {
  let service: EventhubsignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventhubsignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
