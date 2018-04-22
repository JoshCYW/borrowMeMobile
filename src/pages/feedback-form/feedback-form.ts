import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { Feedback } from '../../entities/Feedback';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the FeedbackFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback-form',
  templateUrl: 'feedback-form.html',
})
export class FeedbackFormPage {

  newFeedback: Feedback;

  constructor(public navCtrl: NavController, public navParams: NavParams, public feedbackProvider: FeedbackProvider, public alertCtrl: AlertController) {
    this.newFeedback = new Feedback();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackFormPage');
    console.log("listingToViewId" + this.navParams.get('listingToViewId') + "sellerId" + this.navParams.get('sellerId'));
  }

  makeFeedback(feedbackForm: NgForm) {
    if(feedbackForm.valid){
      this.feedbackProvider.createFeedback(this.newFeedback, sessionStorage.getItem("customerId"),this.navParams.get('sellerId'), this.navParams.get('listingToViewId')).subscribe(
        response => {
          let alert = this.alertCtrl.create({
            title: "Feedback successfully made!",
            subTitle: "We appreciate your feedback!",
            buttons: ['Dismiss']
          });
          alert.present();
        },
        error => {
          let alert = this.alertCtrl.create ({
            title: 'Feedback failed',
            subTitle: 'Please ensure specified details are valid',
            buttons: ['Dismiss']          
          });
          alert.present();
        }
      )
  }
}
}
