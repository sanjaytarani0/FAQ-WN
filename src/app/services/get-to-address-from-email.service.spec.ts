nimport { TestBed } from '@angular/core/testing';

import { GetToAddressFromEmailService } from './get-to-address-from-email.service';

describe('GetToAddressFromEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetToAddressFromEmailService = TestBed.get(GetToAddressFromEmailService);
    expect(service).toBeTruthy();
  });
});
