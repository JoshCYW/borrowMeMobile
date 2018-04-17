import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateListingPage } from './create-listing';

@NgModule({
  declarations: [
    CreateListingPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateListingPage),
  ],
})
export class CreateListingPageModule {}
