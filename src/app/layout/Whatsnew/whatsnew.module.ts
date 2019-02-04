import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsnewComponent } from './whatsnew.component';
import { WhatsnewRoutingModule } from './whatsnew-routing.module';

@NgModule({
  declarations: [WhatsnewComponent],
  imports: [
    CommonModule,
    WhatsnewRoutingModule,

  ]
})
export class WhatsnewModule { }
