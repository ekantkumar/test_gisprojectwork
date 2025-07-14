import { TestBed } from '@angular/core/testing';

import { ShowmapService } from './showmap.service';

describe('ShowmapService', () => {
  let service: ShowmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
