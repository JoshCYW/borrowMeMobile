import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListingProvider } from '../../providers/listing/listing';
import { CustomerProvider } from '../../providers/customer/customer';
import { Listing } from '../../Entities/Listing';
import { CustomerEntity } from '../../entities/customer';
import { ItemPage } from '../item/item';


/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  infoMessage: string;
  customerProfile: CustomerEntity;
  errorMessage: string;
  listings: Listing[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public listingProvider: ListingProvider) {
    this.listings = null;
    this.customerProfile = null;
    if (this.navParams.get("profileToViewId") !== null) {
      //retrieve all listings
      console.log("Customer Id to view: " + this.navParams.get("profileToViewId"));
      this.listingProvider.getListingsByCustomerId(this.navParams.get("profileToViewId")).subscribe(
        response => {
          this.listings = response.listings;
          console.log(this.listings);
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
      console.log(this.navParams.get("profileToViewUsername"));
      this.customerProvider.getCustomer(this.navParams.get("profileToViewUsername")).subscribe(
        response => {
          this.customerProfile = response.customerEntity;
          console.log(response.customerEntity);
          this.infoMessage = "Product loaded successfully";
        },
        error => {
          console.log("Error in retrieving customer details")
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ViewProfilePage');
    if (this.navParams.get("profileToViewId") !== null) {
      //retrieve all listings
      console.log("Customer Id to view: " + this.navParams.get("profileToViewId"));
      this.listingProvider.getListingsByCustomerId(this.navParams.get("profileToViewId")).subscribe(
        response => {
          this.listings = response.listings;
          console.log(this.listings);
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
      console.log(this.navParams.get("profileToViewUsername"));
      this.customerProvider.getCustomer(this.navParams.get("profileToViewUsername")).subscribe(
        response => {
          this.customerProfile = response.customerEntity;
          console.log(response.customerEntity);
          this.infoMessage = "Product loaded successfully";
        },
        error => {
          console.log("Error in retrieving customer details")
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
  }

  ionViewWillLeave() {
    this.listings = null;
    this.customerProfile = null;
  }

  viewListingDetails(event, listing) {
    console.log("button pressed");
    this.navCtrl.push(ItemPage, { 'listingToViewId': listing.listingId });
  }

  popView() {
    this.navCtrl.pop();
  }


}
