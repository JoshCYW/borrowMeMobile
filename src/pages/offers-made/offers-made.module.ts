import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersMadePage } from './offers-made';

@NgModule({
  declarations: [
    OffersMadePage,
  ],
  imports: [
    IonicPageModule.forChild(OffersMadePage),
  ],
})
export class OffersMadePageModule {}
