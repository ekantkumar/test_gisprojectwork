import { TestBed } from '@angular/core/testing';

import { Feeder11Service } from './feeder11.service';

describe('Feeder11Service', () => {
  let service: Feeder11Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Feeder11Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
