import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestFormPage } from './request-form';

@NgModule({
  declarations: [
    RequestFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestFormPage),
  ],
})
export class RequestFormPageModule {}
