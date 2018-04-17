import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GettingStartedGuidePage } from './getting-started-guide';

@NgModule({
  declarations: [
    GettingStartedGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(GettingStartedGuidePage),
  ],
})
export class GettingStartedGuidePageModule {}
