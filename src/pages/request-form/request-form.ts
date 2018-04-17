import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, DateTime } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { Request } from '../../entities/request';
import { NgForm } from '@angular/forms';
import { OffersMadePage } from '../offers-made/offers-made';
/**
 * Generated class for the RequestFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-form',
  templateUrl: 'request-form.html',
})
export class RequestFormPage {
  
  newRequest: Request;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public requestProvider: RequestProvider) {
      this.newRequest = new Request();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestFormPage');
  }

  makeRequest(requestForm: NgForm){
    console.log("******************"+ this.newRequest.startDate + "*****************")
    if (requestForm.valid){
      console.log("******************"+ this.newRequest.accepted + "*****************")
      this.requestProvider.makeRequest(this.newRequest, sessionStorage.getItem("customerId") , this.navParams.get('listingToViewId')).subscribe(
        response => {
          console.log("***********Recieved response from MakeRequest*************");
          this.navCtrl.push(OffersMadePage);
          let alert = this.alertCtrl.create({
            title: 'Request successfully made!',
            subTitle: 'Now all you have to do is wait for your request to be accepted!',
            buttons: ['Dismiss']
          });
          alert.present();
        },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Request failed',
            subTitle: 'Please ensure specified details are valid',
            buttons: ['Dismiss']
          });
          alert.present();
  			}
      )
    }
  }

}
