import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Request } from '../../entities/request';
import { ListingProvider } from '../../providers/listing/listing';
import { RequestProvider } from '../../providers/request/request';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ViewRequestDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-request-detail',
  templateUrl: 'view-request-detail.html',
})
export class ViewRequestDetailPage {

  errorMessage: string;
  request : Request;
  status: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public listingProvider: ListingProvider,
    public requestProvider: RequestProvider) {
    this.request = navParams.get('requestToView');
    this.requestProvider.isLister(sessionStorage.getItem("customerId"), this.request.listingId).subscribe(
      response =>{
        this.status = response.status;
        console.log("****************Status has been set: " + this.status + "*********************")
      },
      error =>{
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
    console.log("****************Testing Listing Title: " + this.request.listingTitle + "******************");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRequestDetailPage');
  }

  acceptRequest(){
    this.requestProvider.acceptRequest(this.request.requestId).subscribe(
      response => {
        this.request = response.request;
        console.log("****************Status has been changed: " + this.request.accepted + "*********************");
        this.navCtrl.push(ProfilePage);
        let alert = this.alertCtrl.create({
          title: "Request Accepted!",
          subTitle: 'Please wait for your borrower to make payment before arranging a pick up time!',
          buttons: ['Dismiss']
        });
        alert.present();
        
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
    console.log("accepted request");
  }

}
