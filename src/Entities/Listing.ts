import { Customer } from "./customer";

export class Listing {
	category: string;
	costPerDay: number;
	customer: Customer;
	images: string[];
	listingAvailable: Boolean;
	listingDescription: string;
	listingId: number;
	listingTitle: string;
}
