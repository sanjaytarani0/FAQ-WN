import { TestBed } from '@angular/core/testing';

import { GetUtcObjectService } from './get-utc-object.service';

describe('GetUtcObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUtcObjectService = TestBed.get(GetUtcObjectService);
    expect(service).toBeTruthy();
  });
});
