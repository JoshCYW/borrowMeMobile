import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewListingDetailPage } from './view-listing-detail';

@NgModule({
  declarations: [
    ViewListingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewListingDetailPage),
  ],
})
export class ViewListingDetailPageModule {}
