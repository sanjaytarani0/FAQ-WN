import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';

import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    MatTooltipModule
  ]
})
export class FaqModule { }
