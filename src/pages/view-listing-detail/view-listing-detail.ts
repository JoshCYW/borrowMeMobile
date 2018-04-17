import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ListingProvider } from '../../providers/listing/listing';

import { Listing } from '../../entities/listing';
import { RequestFormPage } from '../request-form/request-form';
import { RequestProvider } from '../../providers/request/request';
import { EditListingPage } from '../edit-listing/edit-listing';
/**
 * Generated class for the ViewListingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-listing-detail',
  templateUrl: 'view-listing-detail.html',
})
export class ViewListingDetailPage {
  errorMessage: string;
  infoMessage: string;
  listingToViewId: string;
  listingToView: Listing;
  status: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public listingProvider: ListingProvider,
    public requestProvider: RequestProvider) {
    this.listingToView = null;
    this.listingToViewId = navParams.get('listingToView');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewListingDetailPage');
    console.log("Listing to View ID: " + this.listingToViewId)
    // this.listingProvider.retrieveListingById(this.listingToViewId).subscribe(
    //   response => {
    //     this.listingToView = response.listing;
    //     this.infoMessage = "Product loaded successfully";
    //     console.log("LISTING RETRIEVED SUCCESSFULLY");
    //   },
    //   error => {
    //     this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
    //     console.log("LISTING RETRIEVED UNSUCCESSFULLY");
    //   }
    // );

    // this.requestProvider.isLister(sessionStorage.getItem("customerId"),this.listingToViewId).subscribe(
    //   response => {
    //     console.log("************Lister function activated**************");
    //     this.status = response.status;
    //     console.log("************Status: " + this.status + "******************");
    //   },
    //   error => {
    //     this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
    //     console.log("*************Error while trying to engage isLister Function**************");
    //   }
    // )
  }

  ionViewWillEnter() {
    // this.listingProvider.retrieveListingById(this.listingToViewId).subscribe(
    //   response => {
    //     this.listingToView = response.listing;
    //     this.infoMessage = "Product loaded successfully";
    //     console.log("LISTING RETRIEVED SUCCESSFULLY");
    //   },
    //   error => {
    //     this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
    //     console.log("LISTING RETRIEVED UNSUCCESSFULLY");
    //   }
    // );
  }

  goToForm(){
    this.navCtrl.push(RequestFormPage, {"listingToViewId": this.listingToViewId});
  }

  editListing(){
    this.navCtrl.push(EditListingPage, {"listingToView": this.listingToView, "listingToViewId": this.listingToViewId});
  }

}
