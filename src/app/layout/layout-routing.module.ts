import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path:'',component:LayoutComponent,
    children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',loadChildren:'./dashboard/dashboard.module#DashboardModule'},
    {path:'market',loadChildren:'./market/market.module#MarketModule'},
    {path:'profile',loadChildren:'./profile/profile.module#ProfileModule'},
    {path:'settings',loadChildren:'./settings/settings.module#SettingsModule'},
    {path:'search',component:SearchComponent},
    {path:'faq', loadChildren:'./Faq/faq.module#FaqModule'},
    {path:'whatsnew', loadChildren:'./Whatsnew/whatsnew.module#WhatsnewModule'}

  ]  
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
