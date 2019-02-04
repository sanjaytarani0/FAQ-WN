import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhatsnewComponent } from './whatsnew.component';


const routes: Routes = [
  {path:'',component:WhatsnewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatsnewRoutingModule { }
