import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewRequestDetailPage } from './view-request-detail';

@NgModule({
  declarations: [
    ViewRequestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewRequestDetailPage),
  ],
})
export class ViewRequestDetailPageModule {}
