import { TokenInterceptorService } from '../interceptors/token-interceptor.service';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class GetPostsService extends DataService{

  constructor(http:HttpClient) {
     super('https://jsonplaceholder.typicode.com/posts', http);
   }
}
