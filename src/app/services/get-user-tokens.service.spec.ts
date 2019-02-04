import { TestBed } from '@angular/core/testing';

import { GetUserTokensService } from './get-user-tokens.service';

describe('GetUserTokensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserTokensService = TestBed.get(GetUserTokensService);
    expect(service).toBeTruthy();
  });
});
