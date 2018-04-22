import { DateTime } from "ionic-angular";
import { CustomerEntity } from "./customer";
import { Listing } from "./Listing";

export class Request {
  /*
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
  isOpened: boolean; */

  accepted: boolean;
  acknowledged: boolean;
  borrowerLeftFeedback: boolean;
  customerEntity: CustomerEntity;
  endDate: DateTime;
  isOpened: boolean;
  lenderLeftFeedback: boolean;
  listingEntity: Listing;
  message: string;
  noOfDays: number;
  payment: false;
  requestEntityId: number;
  startDate: DateTime;
}

