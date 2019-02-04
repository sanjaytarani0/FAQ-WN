import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions;
  jwtHelper: any;

  constructor(private http:HttpClient) {
    this.jwtHelper = new JwtHelperService();
    // this.headers = {
    //   headers: new Headers({
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   })
    // };
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
   }

   login(Email) {
    let url = environment.apiBaseUrlToken;
    let data = {
      email:Email
    };
    return this.http.post(url,data,this.httpOptions).pipe(map(res => {
      let credentials:any = res;
      localStorage.setItem('auth_token',credentials.accessToken);
      localStorage.setItem('ref_token',credentials.refreshToken);
      localStorage.setItem('isLoggedIn', "true");

      return credentials;
    }));
  }

  run() {
    let d ="sdsdsd"
    return d;
  }
}
