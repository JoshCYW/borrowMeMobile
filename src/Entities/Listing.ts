import { CustomerEntity } from "./customer";

export class Listing {
	category: string;
	costPerDay: number;
	customerEntity: CustomerEntity;
	images: string[];
	listingAvailable: Boolean;
	listingDescription: string;
	listingId: number;
	listingTitle: string;
}
