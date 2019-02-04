import { TestBed } from '@angular/core/testing';

import { TempStorageService } from './temp-storage.service';

describe('TempStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempStorageService = TestBed.get(TempStorageService);
    expect(service).toBeTruthy();
  });
});
