import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BannersComponent } from './banners/banners.component';
import { SendCryptoComponent } from './send-crypto/send-crypto.component';
import { LayoutModule } from '../layout.module';
import { FormsModule } from '@angular/forms';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ReactiveFormsModule } from '@angular/forms'; 
// import { HttpModule } from '@angular/http';
import { LaddaModule } from 'angular2-ladda';




@NgModule({
  declarations: [DashboardComponent, BannersComponent, SendCryptoComponent, TransactionListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpModule,
    LaddaModule.forRoot({
      style: "contract",
      spinnerSize: 40,
      spinnerColor: "red",
      spinnerLines: 12
  })
    

  ]
})
export class DashboardModule { }
