import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { LandingPage } from '../landing/landing';
import { ProfilePage } from '../profile/profile';

import { CustomerProvider } from '../../providers/customer/customer';

import { CustomerEntity } from '../../entities/customer';
import { Request } from '../../entities/request';

import { TabsPage } from '../tabs/tabs';
import { RequestProvider } from '../../providers/request/request';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  displayMessage: string;
  errorMessage: string;
  submitted: boolean;
  isLogin: boolean;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  customer: CustomerEntity;
  requests: Request[];
  unOpenedRequests: number;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public customerProvider: CustomerProvider,
    public requestProvider: RequestProvider) {
    this.submitted = false;
    this.isLogin = false;
    this.customer = null;
    this.requests = null;
    this.unOpenedRequests = 0;
    this.displayMessage = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    if (sessionStorage.getItem("isLogin") === "true") {
      this.isLogin = true;
    }

    this.firstName = sessionStorage.getItem("firstName")
    this.lastName = sessionStorage.getItem("lastName")
  }

  clear() {
    this.username = "";
    this.password = "";
  }

  login(loginForm: NgForm) {
    this.submitted = true;
    if (loginForm.valid) {
      this.customerProvider.doLogin(this.username, this.password).subscribe(
        response => {
          if (response.customerEntity != null) {

            this.customer = response.customerEntity;
            //complete log in and send to profile page for now
            sessionStorage.setItem("customer", response.customerEntity);
            sessionStorage.setItem("firstName", response.customerEntity.firstName);
            sessionStorage.setItem("lastName", response.customerEntity.lastName);
            sessionStorage.setItem("username", response.customerEntity.username);
            console.log(sessionStorage.getItem("username"));
            sessionStorage.setItem("password", response.customerEntity.password);
            sessionStorage.setItem("identificationNo", response.customerEntity.identificationNo);
            sessionStorage.setItem("email", response.customerEntity.email);
            sessionStorage.setItem("contactNo", response.customerEntity.contactNo);
            sessionStorage.setItem("customerId", response.customerEntity.customerId);
            sessionStorage.setItem("isLogin", "true");
            //check whether there has been new requests which has not yet been opened
            console.log("**********CustomerId: " + sessionStorage.getItem("customerId") + "**********")
            this.requestProvider.requestReceived(sessionStorage.getItem("customerId")).subscribe(
              response => {
                this.requests = response.requests;
                for (let request of this.requests) {
                  if (request.isOpened == false) {
                    this.unOpenedRequests = this.unOpenedRequests + 1;
                    console.log("**********Unopened request counter: " + this.unOpenedRequests + "**********");
                  }
                }
                if (this.unOpenedRequests != 0) {
                  this.displayMessage = "You have " + this.unOpenedRequests + " unopened request"
                  let alert = this.alertCtrl.create({
                    title: 'Unopened requests',
                    subTitle: this.displayMessage,
                    buttons: ['Dismiss']
                  });
                  alert.present();
                }
                this.navCtrl.push(TabsPage);
              },
              error => {
                console.log("Error in retrieving customer details")
                this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
              }
            )
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Invalid Login Credentials',
              subTitle: 'Please ensure Username/Password is Valid',
              buttons: ['Dismiss']
            });
            alert.present();
            this.username = "";
            this.password = "";
          }
        },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Invalid Login Credentials',
            subTitle: 'Please ensure Username/Password is Valid',
            buttons: ['Dismiss']
          });
          alert.present();
          this.username = "";
          this.password = "";
          // this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Invalid Login Credentials',
        subTitle: 'Please ensure Username/Password is Valid',
        buttons: ['Dismiss']
      });
      alert.present();
      this.username = "";
      this.password = "";
    }
  }
}
