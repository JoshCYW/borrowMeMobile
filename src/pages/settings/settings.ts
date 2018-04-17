import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileUpdatePage } from '../profile-update/profile-update';
import { ChangePasswordPage } from '../change-password/change-password';
import { HowToBorrowPage } from '../how-to-borrow/how-to-borrow';
import { GettingStartedGuidePage } from '../getting-started-guide/getting-started-guide';
import { SafetyTipsPage } from '../safety-tips/safety-tips';
import { AboutPageModule } from '../about/about.module';
import { LandingPage } from '../landing/landing';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  editProfile() {
    this.navCtrl.push(ProfileUpdatePage);
  }

  changePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }

  howToBorrow() {
    this.navCtrl.push(HowToBorrowPage);
  }

  gettingStartedGuide() {
    this.navCtrl.push(GettingStartedGuidePage);
  }

  safetyTips() {
    this.navCtrl.push(SafetyTipsPage);
  }

  aboutBorrowMe() {
    this.navCtrl.push(AboutPageModule);
  }

  signout() {
    this.navCtrl.setRoot(LandingPage);
    sessionStorage.removeItem("customerId");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("identificationNo");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("contactNo");
    sessionStorage.removeItem("customerId");
    sessionStorage.removeItem("isLogin");
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
  }

}
