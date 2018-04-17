import { Customer } from "./customer";

export class Listing {
	category: string;
	costPerDay: number;
	customerEntity: CustomerEntity;
	images: string[];
	listingAvailable: Boolean;
	listingDescription: string;
	listingId: number;
	listingTitle: string;
	requestList : any[];
	customer : Customer;
}

//placeholder

interface CustomerEntity {
	contactNo: String;
	customerId: number;
	customerType: string;
	email: string;
	feedbackList: any[];
	firstname: string;
	identificationNo: string;
	lastName: string;
	password: string;
	profileImage: string;
	requestList : any[];
	username: string;
}
