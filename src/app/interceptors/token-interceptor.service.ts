import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) {
    
   }

  intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    const token = 'bearer ' + authService.run();
    const authReq = req.clone({ headers: req.headers.set('Authorization', token)});

    return next.handle(authReq).pipe(catchError((error, caught) => 
    {
      return throwError(error);
    }) as any)
   
  } 

}




    // let tokenizedReq = req.clone({
    //   setHeaders: {
    //     Authorization: 'Bearer xx.yy.dd'
    //   }
    // })