import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { CustomerProvider } from '../../providers/customer/customer';
import { ListingProvider } from '../../providers/listing/listing';

import { ProfileUpdatePage } from '../profile-update/profile-update';

import { Customer } from '../../entities/customer';
import { Listing } from '../../entities/listing';

import { SettingsPage } from '../settings/settings';
import { OffersMadePage } from '../offers-made/offers-made';
import { ViewListingDetailPage } from '../view-listing-detail/view-listing-detail';
import { OffersReceivedPage } from '../offers-received/offers-received';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  customerProfileId: number;
  submitted: boolean;
  errorMessage: string;
  infoMessage: string;

  customerProfile: Customer;
  listings: Listing[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public listingProvider: ListingProvider) {
    //this.customerProfile = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(sessionStorage.getItem("customerId"));

    if (sessionStorage.getItem("username") !== null) {

      //retrieve all listings
      this.listingProvider.getListingsById(sessionStorage.getItem("customerId")).subscribe(
        response => {
          this.listings = response.listings;
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );

      this.customerProvider.getCustomer(sessionStorage.getItem("username")).subscribe(
        response => {
          this.customerProfile = response.customer;
          console.log(response.customer.identificationNo);
          this.infoMessage = "Product loaded successfully";
        },
        error => {
          console.log("Error in retrieving customer details")
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
  }

  ionViewWillEnter() {
    console.log("Inside ionViewWillEnter");
    if (sessionStorage.getItem("username") !== null) {

      //retrieve all listings
      this.listingProvider.getListingsById(sessionStorage.getItem("customerId")).subscribe(
        response => {
          this.listings = response.listings;
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );

      this.customerProvider.getCustomer(sessionStorage.getItem("username")).subscribe(
        response => {
          this.customerProfile = response.customer;
          console.log(response.customer.identificationNo);
          this.infoMessage = "Product loaded successfully";
        },
        error => {
          console.log("Error in retrieving customer details")
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
  }

  viewListingDetails(event, listing) {
    console.log("button pressed");
    this.navCtrl.push(ViewListingDetailPage, {'listingToView': listing.listingId});
  }

  updateCustomer() {
    this.navCtrl.push(ProfileUpdatePage, {}, { animate: false });
  }

  settings() {
    this.navCtrl.push(SettingsPage, {}, { animate: false });
  }

  offersMade() {
    this.navCtrl.push(OffersMadePage);
  }

  offersReceived(){
    this.navCtrl.push(OffersReceivedPage);
  } 
}