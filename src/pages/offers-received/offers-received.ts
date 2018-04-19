import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { Request } from '../../entities/request';
import { ListingProvider } from '../../providers/listing/listing';
import { ViewRequestDetailPage } from '../view-request-detail/view-request-detail';

/**
 * Generated class for the OffersReceivedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offers-received',
  templateUrl: 'offers-received.html',
})
export class OffersReceivedPage {

  errorMessage: string;
  requests: Request[]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public requestProvider: RequestProvider,
    public listingProvider: ListingProvider) {

    this.requestProvider.requestReceived(sessionStorage.getItem("customerId")).subscribe(
      response => {
        this.requests = response.requests;
        for (let request in this.requests) {
          let val = this.requests[request];
          console.log(val)
          console.log("************ ListingId: " + val.listingId + "****************");
        }
        console.log("************ Successfully completed RequestReceived Function ****************");
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersReceivedPage');

  }

  viewRequestDetails(event, request) {
    //execute isOpened function here
    if(request.isOpened == false){
      //first time being opened, trigger function
      console.log("**********First time opening view request details**********");
      this.requestProvider.openedRequest(request.requestEntityId).subscribe(
        response => {
          console.log("**********Got a response from openedRequest function:" + response.request.isOpened + "**********");
        },
        error => {
          this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
        }
      )
    }
    else{
      console.log("**********Opened before**********")
    }
    this.navCtrl.push(ViewRequestDetailPage, { "requestToView": request });
  }

}
