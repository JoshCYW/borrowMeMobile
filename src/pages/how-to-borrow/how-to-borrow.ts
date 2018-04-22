import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HowToBorrowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-how-to-borrow',
  templateUrl: 'how-to-borrow.html',
})
export class HowToBorrowPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToBorrowPage');
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(56px)';
      });
    }
  }

  ngAfterViewInit() {

  }

  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(0)';
      });
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

}
