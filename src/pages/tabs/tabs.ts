import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { LandingPage } from '../landing/landing';
import { CreateListingPage } from '../create-listing/create-listing';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  profilePage = ProfilePage;
  createListing = CreateListingPage;
  browsePage = LandingPage;
  tab3Root;

  constructor(){

  }
}
