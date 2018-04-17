import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListingProvider } from '../../providers/listing/listing';
import { Listing } from '../../entities/listing';


/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
	errorMessage: string;
	infoMessage: string;
	listingToViewId: number;
	listingToView: Listing;
	listings: Listing[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public listingProvider: ListingProvider) {
	this.listingToView = null;
	this.listingToViewId = navParams.get('listingToViewId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
	console.log(this.listingToViewId);
	
	this.listingProvider.getListingByListingId(this.listingToViewId).subscribe(
			response => {
				this.listingToView = response.listing;
				this.infoMessage = "Listing loaded successfully";
				console.log(this.listingToView.costPerDay);
			},
			error => {				
				this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
			}
		);
		
	this.listingProvider.getListings().subscribe(
		response => {
			this.listings = response.listings;
			this.buildArray(this.listings);
		},
		error => {
			this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
		}
	);
  }

	ionViewWillEnter() {	
		this.listingProvider.getListingByListingId(this.listingToViewId).subscribe(
			response => {
				this.listingToView = response.listing;
				this.infoMessage = "Listing loaded successfully";								
			},
			error => {				
				this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
			}
		);
		
		this.listingProvider.getListings().subscribe(
			response => {
				this.listings = response.listings;
				this.buildArray(this.listings);
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}
		);
		
	}
	
	private buildArray(array) {
		return new Promise(resolve => {
			let length = array.length, j, i;
			// While there remain elements to shuffle…
			while (length) {
				// Pick a remaining element…
				i = Math.floor(Math.random() * length--);
				// And swap it with the current element.
				j = array[length];
				array[length] = array[i];
				array[i] = j;
			}
		resolve(true);
		});
	}

	viewItem(listingId) {
		this.navCtrl.push(ItemPage, {'listingToViewId': listingId});	
		}

	popView() {
		this.navCtrl.pop();
	}
}
