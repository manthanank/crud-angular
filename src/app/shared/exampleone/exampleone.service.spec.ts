import { TestBed } from '@angular/core/testing';

import { ExampleoneService } from './exampleone.service';

describe('ExampleoneService', () => {
  let service: ExampleoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
