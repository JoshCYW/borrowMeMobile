import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { Request } from '../../entities/request';
import { ListingProvider } from '../../providers/listing/listing';
import { ViewRequestDetailPage } from '../view-request-detail/view-request-detail';

/**
 * Generated class for the OffersMadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offers-made',
  templateUrl: 'offers-made.html',
})
export class OffersMadePage {

  errorMessage: string;
  alertCtrl: any;
  requests: Request[];
  request: Request;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public requestProvider: RequestProvider,
    public listingProvider: ListingProvider) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersMadePage');

    this.requestProvider.requestMade(sessionStorage.getItem("customerId")).subscribe(
      response => {
        this.requests = response.requests;
        for(let request in this.requests){
          let val = this.requests[request];
          console.log("************ ListingId: " + val.listingId + "****************");
          this.listingProvider.getListingByListingId(val.listingId).subscribe(
            response => {
              val.listingTitle = response.listing.listingTitle;
              console.log("************ Successfully set Listing Title************");
            },
            error => {
              this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
            }
          )
        }
      },
      error => {
        let alert = this.alertCtrl.create({
          title: 'Error retrieveing Requests made',
          subTitle: 'Please try again',
          buttons: ['Dismiss!']
        });
        alert.present();
      }
    )
  }

  viewRequestDetails(event, request){
    this.navCtrl.push(ViewRequestDetailPage, {'requestToView': request});
  }

}
