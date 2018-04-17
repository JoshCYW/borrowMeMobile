import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { CustomerProvider } from '../../providers/customer/customer';

import { CustomerEntity } from '../../entities/customer';
/**
 * Generated class for the ProfileUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {

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

  popthis() {
    this.navCtrl.pop();
  }

  update(updateCustomer: NgForm) {
    this.submitted = true;
    console.log(this.customerToUpdate);
    if (updateCustomer.valid) {
      this.customerProvider.updateCustomer(this.customerToUpdate).subscribe(
        response => {
          sessionStorage.setItem("firstName", response.customerEntity.firstName);
          sessionStorage.setItem("lastName", response.customerEntity.lastName);
          sessionStorage.setItem("username", response.customerEntity.username);
          sessionStorage.setItem("identificationNo", response.customerEntity.identificationNo);
          sessionStorage.setItem("email", response.customerEntity.email);
          sessionStorage.setItem("contactNo", response.customerEntity.contactNo);
          console.log("Success");
          let alert = this.alertCtrl.create({
            title: 'Update successful',
            subTitle: 'Data has been successfully altered in the backend',
            buttons: ['Dismiss']
          });
          alert.present();
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
    else {
    }
  }

}
