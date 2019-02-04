import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, getToken } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppErrorHandler } from './common/errors/app-error-handler';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { LaddaModule } from 'angular2-ladda';
import { JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    LaddaModule.forRoot({
      style: "contract",
      spinnerSize: 40,
      spinnerColor: "red",
      spinnerLines: 12
  }),
  JwtModule.forRoot({
    config: {
      tokenGetter: getToken
    }
  })
    
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {provide: HTTP_INTERCEPTORS,
     useClass: TokenInterceptorService,
     multi:true},
     {provide: String, useValue: "dummy"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
