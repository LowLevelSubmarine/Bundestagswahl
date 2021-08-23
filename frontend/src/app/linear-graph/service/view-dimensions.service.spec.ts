import { TestBed } from '@angular/core/testing';

import { ViewDimensionsService } from './view-dimensions.service';

describe('ViewDimensionsService', () => {
  let service: ViewDimensionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewDimensionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
