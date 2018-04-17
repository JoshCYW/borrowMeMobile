import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Listing } from '../../entities/listing';
import { ListingProvider } from '../../providers/listing/listing';
import { NgForm } from '@angular/forms';
import { ViewListingDetailPage } from '../view-listing-detail/view-listing-detail';
import { CustomerProvider } from '../../providers/customer/customer';

/**
 * Generated class for the CreateListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-create-listing',
	templateUrl: 'create-listing.html',
})
export class CreateListingPage {

	errorMessage: string;
	infoMessage: string;
	newListing: Listing;

	submitted: boolean;

	constructor(public navCtrl: NavController,
		public alertCtrl: AlertController,
		public navParams: NavParams,
		public listingProvider: ListingProvider,
		public customerProvider: CustomerProvider) {
		this.submitted = false;
		this.newListing = new Listing();
		this.customerProvider.getCustomer(sessionStorage.getItem("username")).subscribe(
			response => {
				this.newListing.customer = response.customer;
				console.log("***************Successfully set up customer*******************");
			},
			error =>{
				this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
			}
		)
	}

	clear() {
		console.log("Clearing nows");
		this.infoMessage = null;
		this.errorMessage = null;
		this.submitted = false;
		this.newListing = new Listing();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateListingPage');
	}

	create(createProductForm: NgForm) {
		this.submitted = true;

		this.infoMessage = null;
		this.errorMessage = null;
		console.log(this.newListing.customer);
		if (createProductForm.valid) {
			this.listingProvider.createNewListing(this.newListing).subscribe(
				response => {
					let alert = this.alertCtrl.create({
						title: 'Item listed Successfully',
						subTitle: 'Congratulations, a new listing has been made!',
						buttons: ['Dismiss!']
					});
					console.log("Listing Id of new Item: " + response.listing.listingId);
					this.navCtrl.push(ViewListingDetailPage, { 'listingToView': response.listing.listingId });
					alert.present();
					this.infoMessage = "New Listing " + response.listing.listingId + " created successfully";
				},
				error => {
					this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
				}
			);
		}
		else{
			console.log("form invalid")
		}
	}

}
