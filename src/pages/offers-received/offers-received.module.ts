import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersReceivedPage } from './offers-received';

@NgModule({
  declarations: [
    OffersReceivedPage,
  ],
  imports: [
    IonicPageModule.forChild(OffersReceivedPage),
  ],
})
export class OffersReceivedPageModule {}
