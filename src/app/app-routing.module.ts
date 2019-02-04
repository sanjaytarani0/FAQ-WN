import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '', loadChildren: './login-layout/login-layout.module#LoginLayoutModule'},
  { path: 'layout', loadChildren: './layout/layout.module#LayoutModule'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
