import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { LoginLayoutComponent } from './login-layout.component';
import { SearchUserComponent } from './search-user/search-user.component';

const routes: Routes = [
  {
    path:'',component:LoginLayoutComponent,
    children:[
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',component:GoogleSigninComponent},
      {path:'search-user',component:SearchUserComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginLayoutRoutingModule { }
