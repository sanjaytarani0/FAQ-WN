import { TestBed } from '@angular/core/testing';

import { GetGoogleRefreshTokenService } from './get-google-refresh-token.service';

describe('GetGoogleRefreshTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetGoogleRefreshTokenService = TestBed.get(GetGoogleRefreshTokenService);
    expect(service).toBeTruthy();
  });
});
