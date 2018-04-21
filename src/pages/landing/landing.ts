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
	mockListings: String[];

	constructor(public navCtrl: NavController, public navParams: NavParams, public listingProvider: ListingProvider, public mockProvider: MocksProvider) {
		this.categories = ['Party', 'Electronics', 'Sports'];
		this.categories2 = ['Vehicles', 'Others'];
		this.searchControl = new FormControl();
		console.log(sessionStorage.getItem("username"));
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LandingPage');
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

		this.mockListings = this.mockProvider.getListingPhotos();
		console.log(this.mockListings[0]);
		this.buildArray(this.mockListings);
	}

	viewItem(listingId) {
			this.navCtrl.push(ItemPage, { 'listingToViewId': listingId });			
	}

	filterItems(searchTerm) {
		return this.listings.filter((listing) => {
			return listing.listingTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});
	}
	/*
		goToSearch($event) {
			let target = this.listings.filter(listing => listing.listingTitle === '$event');
			this.viewItem(target.listingId);
		}
	*/
	setFilteredItems() {
		this.searchItems = this.filterItems(this.searchTerm);
	}

	buildArray(array) {
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
}
