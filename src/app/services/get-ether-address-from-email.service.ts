import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetEtherAddressFromEmailService extends DataService {

  constructor(http:HttpClient) {
      super('v1/getEtherAddress', http)
   }
}
