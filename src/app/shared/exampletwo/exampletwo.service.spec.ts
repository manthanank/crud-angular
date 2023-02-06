import { TestBed } from '@angular/core/testing';

import { ExampletwoService } from './exampletwo.service';

describe('ExampletwoService', () => {
  let service: ExampletwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampletwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
