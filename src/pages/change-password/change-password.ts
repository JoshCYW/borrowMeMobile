import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { CustomerEntity } from '../../entities/customer';
import { CustomerProvider } from '../../providers/customer/customer';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  customerToUpdate: CustomerEntity;
  submitted: boolean;
  errorMessage: string;
  infoMessage: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public alertCtrl: AlertController) {
    this.customerToUpdate = null;
    this.submitted = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUpdatePage');
    if (sessionStorage.getItem("username") !== null) {
      this.customerProvider.getCustomer(sessionStorage.getItem("username")).subscribe(
        response => {
          this.customerToUpdate = response.customerEntity;
          console.log("Hello");
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
  }

  ionViewWillEnter() {
    if (sessionStorage.getItem("username") !== null) {
      this.customerProvider.getCustomer(sessionStorage.getItem("username")).subscribe(
        response => {
          this.customerToUpdate = response.customerEntity;
          console.log(response.customerEntity.identificationNo);
        },
        error => {
          console.log("Error in retrieving customer details")
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
  }

  update(changePasswordForm: NgForm) {
    this.submitted = true;
    if (changePasswordForm.valid) {
      this.customerProvider.changePassword(this.customerToUpdate).subscribe(
        response => {
          if (response.customerEntity != null) {
            console.log("Success");
            let alert = this.alertCtrl.create({
              title: 'Password has been changed',
              subTitle: 'Data has been successfully altered in the backend',
              buttons: ['Dismiss']
            });
            alert.present();
            this.navCtrl.setRoot(ProfilePage);
          }
          else {
            console.log("Unsuccessful");
            let alert = this.alertCtrl.create({
              title: 'Error in updating password, please try again',
              subTitle: 'There was an error when changing your password, please try again',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Form invalid, please try again',
        subTitle: 'There was an error when changing your password, please try again',
        buttons: ['Dismiss']
      });
      alert.present();
    }

  }

  popThis() {
    this.navCtrl.pop();
  }

}
