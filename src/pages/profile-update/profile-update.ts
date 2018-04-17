import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { CustomerProvider } from '../../providers/customer/customer';

import { Customer } from '../../entities/customer';
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

  customerToUpdate: Customer;
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
          this.customerToUpdate = response.customer;
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
          this.customerToUpdate = response.customer;
          console.log(response.customer.identificationNo);
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
    if (updateCustomer.valid) {
      this.customerProvider.updateCustomer(this.customerToUpdate).subscribe(
        response => {
          sessionStorage.setItem("firstName", response.customer.firstName);
          sessionStorage.setItem("lastName", response.customer.lastName);
          sessionStorage.setItem("username", response.customer.username);
          sessionStorage.setItem("identificationNo", response.customer.identificationNo);
          sessionStorage.setItem("email", response.customer.email);
          sessionStorage.setItem("contactNo", response.customer.contactNo);
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
