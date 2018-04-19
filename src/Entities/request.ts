import { DateTime } from "ionic-angular";

export class Request {
  customerEntity: any;
  requestEntityId: number;
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
  isOpened: boolean;
}
