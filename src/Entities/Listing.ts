import { CustomerEntity } from "./customer";
import { Feedback } from "./Feedback";

export class Listing {
	category: string;
	costPerDay: number;
	customerEntity: CustomerEntity;
	//feedbacksOnListing: Feedback
	images: string[];
	listingAvailable: Boolean;
	listingDescription: string;
	listingId: number;
	listingTitle: string;
}
