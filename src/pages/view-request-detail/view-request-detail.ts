import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Request } from '../../entities/request';
import { ListingProvider } from '../../providers/listing/listing';
import { RequestProvider } from '../../providers/request/request';
import { ProfilePage } from '../profile/profile';
import { PaymentProvider } from '../../providers/payment/payment';
import { OffersMadePage } from '../offers-made/offers-made';

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

  displayMessage: string;
  errorMessage: string;
  request: Request;
  custId: number;
  checkCustId: number;
  isAccepted: boolean;
  isAcknowledged: boolean;
  isPayment: boolean;
  isDeleted: boolean;
  payment: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public listingProvider: ListingProvider,
    public requestProvider: RequestProvider,
    public paymentProvder: PaymentProvider) {
    this.request = navParams.get('requestToView');
    this.custId = +sessionStorage.getItem("customerId");
    this.checkCustId = this.request.customerEntity.customerId;
    this.isAccepted = this.request.accepted;
    this.isPayment = this.request.payment;
    this.isAcknowledged = this.request.acknowledged;
    this.isDeleted = false;
    console.log("**************Payment: " + this.isPayment);
    console.log(this.custId + " " + this.checkCustId);
    console.log(this.request);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRequestDetailPage');
  }

  acceptRequest() {
    this.requestProvider.acceptRequest(this.request.requestEntityId).subscribe(
      response => {
        this.request = response.request;
        console.log("****************Status has been changed: " + this.request.accepted + "*********************");
        this.navCtrl.setRoot(ProfilePage);
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

  rejectRequest(){
    this.requestProvider.rejectRequest(this.request.requestEntityId).subscribe(
      response => {
        this.request = response.request;
        console.log("****************Status has been changed: " + this.request.accepted + "*********************");
        this.navCtrl.setRoot(ProfilePage);
        let alert = this.alertCtrl.create({
          title: "Request Rejected",
          subTitle: 'Request has been successfully rejected.',
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

  makePayment() {
    this.paymentProvder.makePayment(this.request.requestEntityId).subscribe(
      response => {
        this.payment = response.payment.totalAmount;
        this.displayMessage = "A total of " + this.payment + " has been debited to your account";
        let alert = this.alertCtrl.create({
          title: "Payment completed!",
          subTitle: this.displayMessage,
          buttons: ['Dismiss']
        });
        alert.present();
        this.navCtrl.setRoot(ProfilePage);
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }

  deleteRequest() {
    console.log("RequestEntityId: " + this.request.requestEntityId);
    this.requestProvider.deleteRequest(this.request.requestEntityId).subscribe(
      response => {
        this.isDeleted = response.status;
        console.log("Reponse.status: " + response.status);
        if (this.isDeleted) {
          let alert = this.alertCtrl.create({
            title: "Request deleted",
            subTitle: "Your request has been successfully deleted!",
            buttons: ['Dismiss']
          });
          alert.present();
          this.navCtrl.setRoot(ProfilePage);
        }
        else {
          let alert = this.alertCtrl.create({
            title: "Unable to delete request",
            subTitle: "There was an error while processing the deletion of the request, please try again in  a few minutes",
            buttons: ['Dismiss']
          });
          alert.present();
        }
      },
      error => {
        this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
      }
    )
  }
}
