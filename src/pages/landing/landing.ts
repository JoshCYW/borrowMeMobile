import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular';
import { Listing } from '../../entities/Listing';
import { ListingProvider } from '../../providers/listing/listing';
import { FormControl } from '@angular/forms';
import { ItemPage } from "../item/item";
import 'rxjs/add/operator/debounceTime';
import { MocksProvider } from '../../providers/mocks/mocks';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-landing',
	templateUrl: 'landing.html',
})

export class LandingPage {
	categories: string[];
	errorMessage: string;
	listings: Listing[];
	categories2: string[];
	searchItems: any;
	searchTerm: string = '';
	searchControl: FormControl;

	constructor(public navCtrl: NavController, public navParams: NavParams, public listingProvider: ListingProvider) {
		this.categories = ['Party', 'Electronics', 'Sports'];
		this.categories2 = ['Vehicles', 'Others'];
		this.searchControl = new FormControl();
		console.log(sessionStorage.getItem("username"));
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LandingPage');
		this.listingProvider.getListings().subscribe(
			response => {
				this.listings = response.listings;
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}
		);
		this.searchControl.valueChanges.debounceTime(300).subscribe(search => {

			this.setFilteredItems();

		});
	}

	ionViewWillEnter() {
		console.log('ionViewWillLoad LandingPage');
		this.listingProvider.getListings().subscribe(
			response => {
				this.listings = response.listings;
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}
		);
		this.searchControl.valueChanges.debounceTime(300).subscribe(search => {

			this.setFilteredItems();

		});

		this.scrambleArray(this.listings);
	}

	ionViewWillLeave() {
	}

	viewItem(listingId) {
		this.navCtrl.push(ItemPage, { 'listingToViewId': listingId });
	}

	filterItems(searchTerm) {
		return this.listings.filter((listing) => {
			return listing.listingTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});
	}

	setFilteredItems() {
		this.searchItems = this.filterItems(this.searchTerm);
	}

	scrambleArray(array) {
		return new Promise(resolve => {
			let length = array.length, j, i;
			while (length) {
				i = Math.floor(Math.random() * length--);
				j = array[length];
				array[length] = array[i];
				array[i] = j;
			}
			resolve(true);
		});
	}
}
