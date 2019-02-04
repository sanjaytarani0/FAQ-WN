import { TestBed } from '@angular/core/testing';

import { GetEtherAddressFromEmailService } from './get-ether-address-from-email.service';

describe('GetEtherAddressFromEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetEtherAddressFromEmailService = TestBed.get(GetEtherAddressFromEmailService);
    expect(service).toBeTruthy();
  });
});
