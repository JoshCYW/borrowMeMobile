import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Feedback } from '../../Entities/Feedback';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FeedbackProvider {

  ipAddress = '192.168.137.1';
	portNo = '8080';
	fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/BorrowMe-war/Resources/Listing';
	
	baseUrl = "/api/Listing";

  constructor(public httpClient: HttpClient, public platform: Platform) {
    console.log('Hello FeedbackProvider Provider');
  }

  createFeedback(newFeedback: Feedback, reviewerId: string, revieweeId: string, listingId: String): Observable<any> {
    let path: string = '';
      
    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    let createFeedbackReq = {
      "feedback": newFeedback
    };
    console.log(newFeedback);
    
    return this.httpClient.put<any>(path + "/" + reviewerId + "/" + revieweeId + "/" + listingId, createFeedbackReq, httpOptions).pipe
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
