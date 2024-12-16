import { TestBed } from '@angular/core/testing';

import { HomesafeService } from './homesafe.service';

describe('HomesafeService', () => {
  let service: HomesafeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomesafeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
