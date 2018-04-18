import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Platform, DateTime } from 'ionic-angular';
import { Payment } from '../../entities/payment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PaymentProvider {

  ipAddress = '192.168.137.1';
  portNo = '8080';
  fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/BorrowMe-war/Resources/Payment';

  baseUrl = "/api/Payment";


  constructor(public platform: Platform,
    private httpClient: HttpClient) {
    console.log('Hello PaymentProvider Provider');
  }

  makePayment(requestId: number): Observable<any> {
    let path: string = '';
    
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }
    console.log("*********************Made it to the Payment provider**************")
    return this.httpClient.post<any>(path + "/makePayment/" + requestId, httpOptions).pipe
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
