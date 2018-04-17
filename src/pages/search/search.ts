import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Listing } from '../../entities/Listing';
import { ListingProvider} from '../../providers/listing/listing';
import { ItemPage } from '../item/item';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
	
	listings: Listing[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public listingProvider: ListingProvider) {
	  //this.listings = listingProvider.getByName(1); to be implemented when rest works
	  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }



  // view a item. Will insert a var next time
  viewItem() {
    //this.nav.push(ItemPage);
  }

}
