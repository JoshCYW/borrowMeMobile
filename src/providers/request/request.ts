import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Platform, DateTime } from 'ionic-angular';
import { Request } from '../../entities/request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RequestProvider {

  ipAddress = '192.168.137.1';
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/BorrowMe-war/Resources/Request';

  baseUrl = "/api/Request";

  requestId: number;
  startDate: DateTime;
  endDate: DateTime;
  payment: boolean;
  acknowledged: boolean;
  accepted: boolean;
  overdue: boolean;
  message: string;

  loginCredential = "";

  constructor(public platform: Platform,
    private httpClient: HttpClient) {
    console.log('Hello RequestProvider Provider');
  }

  makeRequest(request: Request, requesterId: string, listingId: string): Observable<any> {
    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }
    let requestJSON ={
      "request": request,
      "startDateStr":request.startDate,
      "endDateStr":request.endDate
    }
    console.log("*********************" + request.message + "*********************");
    console.error('************** ' + this.startDate);
    console.error('************** ' + JSON.stringify(requestJSON));

    return this.httpClient.put<any>(path + "/" + requesterId + "/" + listingId, requestJSON, httpOptions).pipe
      (
      catchError(this.handleError)
      );
  }

  requestMade(customerId: string): Observable<any> {
    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.get<any>(path + "/requestMade/" + customerId).pipe
      (
      catchError(this.handleError)
      );
  }

  requestReceived(customerId: string): Observable<any> {
    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.get<any>(path + "/requestReceived/" + customerId).pipe
      (
      catchError(this.handleError)
      );
  }

  isLister(customerId: string, listingId: number): Observable<any> {
    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.get<any>(path + "/isLister/" + customerId + "/" + listingId).pipe
      (
      catchError(this.handleError)
      );
  }

  acceptRequest(requestId: number): Observable<any> {
    let path: string = '';
    
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.post<any>(path + "/acceptRequest/" + requestId, httpOptions).pipe
      (
      catchError(this.handleError)
      );  
  }

  openedRequest(requestId: number): Observable<any> {
    let path: string = '';
    
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.post<any>(path + "/openedRequest/" + requestId, httpOptions).pipe
      (
      catchError(this.handleError)
      );  
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An unknown error has occurred:', error.error.message);
    }
    else {
      console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
    }
    return new ErrorObservable(error);
  }

}
