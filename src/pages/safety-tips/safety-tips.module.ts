import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafetyTipsPage } from './safety-tips';

@NgModule({
  declarations: [
    SafetyTipsPage,
  ],
  imports: [
    IonicPageModule.forChild(SafetyTipsPage),
  ],
})
export class SafetyTipsPageModule {}
