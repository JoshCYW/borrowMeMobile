import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { LandingPage } from '../landing/landing';
import { ProfilePage } from '../profile/profile';

import { CustomerProvider } from '../../providers/customer/customer';

import { Customer } from '../../entities/customer';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage
{
  submitted: boolean;
	isLogin: boolean;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
  customer: Customer;


  constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public customerProvider: CustomerProvider)
  {
    this.submitted = false;
    this.isLogin = false;
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad LoginPage');

    if(sessionStorage.getItem("isLogin") === "true")
    {
      this.isLogin = true;
    }

    this.firstName = sessionStorage.getItem("firstName")
    this.lastName = sessionStorage.getItem("lastName")
  }

  clear()
	{
		this.username = "";
		this.password = "";
  }

  login(loginForm: NgForm)
  {
    this.submitted = true;
    if (loginForm.valid)
    {
      this.customerProvider.doLogin(this.username,this.password).subscribe(
  			response => {
          if(response.customer != null){
          
            this.customer = response.customer;
            //complete log in and send to profile page for now
            sessionStorage.setItem("customer", response.customer);
            sessionStorage.setItem("firstName", response.customer.firstName);
            sessionStorage.setItem("lastName", response.customer.lastName);
            sessionStorage.setItem("username", response.customer.username);
            sessionStorage.setItem("password", response.customer.password);
            sessionStorage.setItem("identificationNo", response.customer.identificationNo);
            sessionStorage.setItem("email", response.customer.email);
            sessionStorage.setItem("contactNo", response.customer.contactNo);
            sessionStorage.setItem("customerId", response.customer.customerId);
            sessionStorage.setItem("isLogin", "true");
            // this.CustomerProvider.setLoginCredential(response.username,response.password);
            //push to new page
            this.navCtrl.push(TabsPage);
          }
          else{ 
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
    else
    {
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

  get(){
    console.log(this.username);
    this.customerProvider.getCustomer(this.username).subscribe(
      response=>{
        if(response.customer != null){
          console.log(response.customer);
        }
        else{
          console.log("nope");
        }
      }
    )
  }

}
