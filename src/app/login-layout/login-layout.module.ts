import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginLayoutRoutingModule } from './login-layout-routing.module';
import { LoginLayoutComponent } from './login-layout.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { LayoutModule } from '../layout/layout.module';
import { SearchUserComponent } from './search-user/search-user.component';
import { ProfileModule } from '../layout/profile/profile.module';


@NgModule({
  declarations: [LoginLayoutComponent, GoogleSigninComponent, LoginHeaderComponent, SearchUserComponent],
  imports: [
  CommonModule,
    LoginLayoutRoutingModule,
    LayoutModule,
    ProfileModule
  ]
})
export class LoginLayoutModule { }
