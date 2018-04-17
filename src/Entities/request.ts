import { DateTime } from "ionic-angular";

export class Request {
    requestId: number;
    startDate: DateTime;
    endDate: DateTime;
    noOfDays: number;
    payment: boolean;
    acknowledged: boolean;
    accepted: boolean;
    overdue: boolean;
    message: string;
    listingId: number;
    listingTitle: string;
  }
  