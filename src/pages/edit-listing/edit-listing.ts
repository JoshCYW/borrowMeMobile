import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { ListingProvider } from '../../providers/listing/listing';
import { Listing } from '../../entities/Listing';
import { ItemPage } from '../item/item';

/**
 * Generated class for the EditListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-listing',
  templateUrl: 'edit-listing.html',
})
export class EditListingPage {

  errorMessage: string;
  listingToViewId: number;

  listingToUpdate: Listing;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public listingProvider: ListingProvider,
    public requestProvider: RequestProvider,
    public alertCtrl: AlertController) {
      this.listingToUpdate = navParams.get('listingToView');
      this.listingToViewId = navParams.get('listingToViewId');
      console.log(this.listingToViewId);
      this.listingProvider.getListingByListingId(this.listingToViewId).subscribe(
        response => {
          this.listingToUpdate = response.listing;
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditListingPage');

  }

  update(updateListingForm) {
    if(updateListingForm.valid){
      console.log(this.listingToUpdate.listingId);
      this.listingProvider.updateListing(this.listingToUpdate, sessionStorage.getItem("customerId")).subscribe(
        response => {
          console.log(this.listingToUpdate);
          console.log("******Successfully executed update*********");
          this.listingToUpdate = response.listing;
          let alert = this.alertCtrl.create({
            title: 'Updated successfully!',
            subTitle: 'Your listing is all set! You will now be redirected your listing details page',
            buttons: ['Dismiss']
          });
          alert.present();
          this.navCtrl.setRoot(ItemPage, {"listingToViewId": this.listingToViewId});
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      )
    }
  }



}
