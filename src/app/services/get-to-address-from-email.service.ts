import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetToAddressFromEmailService {

  constructor() { }

  getAddress(email) {
    return email;
  }

}
