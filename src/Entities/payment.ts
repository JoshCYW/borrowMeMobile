import { Listing } from "./Listing";
import { Request } from "./request";

export class Payment {
    totalAmount: number;
    paymentEntityId: number;
    status: boolean;
    listingEntity: Listing;
    requestEntity: Request;
}
