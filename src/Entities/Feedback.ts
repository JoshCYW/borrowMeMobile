import { CustomerEntity } from "./customer";
import { Listing } from "./Listing";
import { Request } from "./request";

export class Feedback {
    rating: number;
    review: String;
    request: Request;
    reviewer: CustomerEntity;
    reviewee: CustomerEntity;
    listing: Listing;
}