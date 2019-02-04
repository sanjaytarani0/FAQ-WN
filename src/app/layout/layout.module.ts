import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, SearchComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProfileModule,
    
  ],
  exports:[
    FooterComponent
  ]
})
export class LayoutModule { }
