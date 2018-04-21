import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { Feedback } from '../../Entities/Feedback';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public feedbackProvider: FeedbackProvider) {
    this.newFeedback = new Feedback();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackFormPage');
  }

  makeFeedback(feedbackForm: NgForm) {
    if(feedbackForm.valid)
      this.feedbackProvider.make
  }
}
