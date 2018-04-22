import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListingProvider } from '../../providers/listing/listing';
import { Listing } from '../../entities/listing';
import { EditListingPage } from '../edit-listing/edit-listing';
import { RequestFormPage } from '../request-form/request-form';
import { FeedbackFormPage } from '../feedback-form/feedback-form';
import { FeedbackProvider } from '../../providers/feedback/feedback';
import { Feedback } from '../../entities/Feedback';
import { ProfilePage } from '../profile/profile';
import { ViewProfilePage } from '../view-profile/view-profile';


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
	slideData: string[];
	customerId: number;
	checkCustId: number;
	feedbacks: Feedback[];

	constructor(public navCtrl: NavController, public navParams: NavParams, public listingProvider: ListingProvider, public feedbackProvider: FeedbackProvider) {
		this.listingToView = null;
		this.listingToViewId = navParams.get('listingToViewId');
		this.checkCustId = +sessionStorage.getItem("customerId");
		this.slideData = [];
		console.log(this.listingToViewId);
		console.log("Customer ID (CHECK)" + this.checkCustId)
		this.listingProvider.getListingByListingId(this.listingToViewId).subscribe(
			response => {
				this.listingToView = response.listing;
				if(this.listingToView.images[0] == "./images/noimage.png"){
					this.slideData.push("assets/imgs/noimage.png");
					console.log(this.slideData);
				}
				else{
					this.slideData = this.listingToView.images;
				}
				this.customerId = response.listing.customerEntity.customerId;
				console.log("Customer ID (CustomerId)" + this.customerId)
			},
			error => {
				this.errorMessage = "HTTP " + error.status + ": " + error.error.message;
			}
		);

		this.listingProvider.getListings().subscribe(
			response => {
				this.listings = response.listings;
				this.scrambleArray(this.listings);
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}
		);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ItemPage');
		this.feedbackProvider.getFeedbacksByRevieweeId(this.customerId).subscribe(
			response => {
				this.feedbacks = response.feedbacks;
				console.log(this.feedbacks);
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}			
		);	
	}

	ionViewWillEnter() {
		console.log('ionViewWillEnter ItemPage');
		this.feedbackProvider.getFeedbacksByRevieweeId(this.customerId).subscribe(
			response => {
				this.feedbacks = response.feedbacks;
			},
			error => {
				this.errorMessage = "HTTP" + error.status + ": " + error.error.message;
			}			
		);	
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

	viewItem(listingId) {
		this.navCtrl.push(ItemPage, { 'listingToViewId': listingId });
	}

	viewProfile(customerId, customerUsername){
		if(customerId == sessionStorage.getItem("customerId")){
			console.log("View personal profile");
			console.log(customerId + "********************")
			this.navCtrl.push(ProfilePage, {'profileToViewId': customerId});
		}
		else{
			console.log("View Other profile");
			console.log(customerUsername + "***************** username")
			this.navCtrl.push(ViewProfilePage, {'profileToViewId': customerId, 'profileToViewUsername': customerUsername});
		}
	}

	popView() {
		this.navCtrl.pop();
	}

	editListing() {
		this.navCtrl.push(EditListingPage, { 'listingToViewId': this.listingToViewId });
	}

	makeRequest() {
		this.navCtrl.push(RequestFormPage, { 'listingToViewId': this.listingToViewId });
	}

	giveFeedback() {
		this.navCtrl.push(FeedbackFormPage, { 'listingToViewId': this.listingToViewId, 'sellerId': this.customerId} )
	}
}
