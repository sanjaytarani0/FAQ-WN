import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PrivateKeyBackupComponent } from './private-key-backup/private-key-backup.component';
import { AlertMessageSetupComponent } from './alert-message-setup/alert-message-setup.component';

@NgModule({
  declarations: [SettingsComponent, PrivateKeyBackupComponent, AlertMessageSetupComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
