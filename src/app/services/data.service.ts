import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../common/errors/app-error';
import { NotFoundError } from '../common/errors/not-error-found';
import { BadInput } from '../common/errors/bad-input';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  baseUrl = environment.apiBaseUrl;

  httpOptions;

  constructor(private url:string, private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }


  getUserTokens(userId) {
    return this.http.get(this.baseUrl + this.url + "?userId=" + userId)
    .pipe(catchError(this.handleError));
  }

  getGoogleRefreshToken(userId) {
    return this.http.get(this.baseUrl + this.url + "?userId=" + userId)
    .pipe(catchError(this.handleError));
  }

  getEtherAddrssFromEmail(email){
    return this.http.get(this.baseUrl + this.url + "?email=" + email)
    .pipe(catchError(this.handleError));
  }

  


  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
      .pipe(catchError(this.handleError));
  }
  


  private handleError(error: Response) {
    if (error.status === 400)
      return throwError(new BadInput())

    if (error.status === 404)
      return throwError(new NotFoundError());

    return throwError(new AppError(error));
  }

}
