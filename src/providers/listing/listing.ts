import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Platform } from 'ionic-angular';
import { Listing } from "../../entities/listing";


const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ListingProvider {
	
	ipAddress = '192.168.137.1';
	portNo = '8080';
	fullBaseUrl = 'http://' + this.ipAddress + ':' + this.portNo + '/BorrowMe-war/Resources/Listing';
	
	baseUrl = "/api/Listing";
	
  constructor(public platform: Platform, private httpClient: HttpClient) {
    console.log('Hello ListingProvider Provider');
  }

  	getListings(): Observable<any> {
	
		let path: string = '';
		
		if(this.platform.is('core') || this.platform.is('mobileweb'))  {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}
		return this.httpClient.get<any>(path + "/retrieveAllListings").pipe 
		(
			catchError(this.handleError)
		);
	}
	
	getListingByListingId(productId: number): Observable<any> {
		let path: string = '';
		
		if(this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}
	
		return this.httpClient.get<any>(path + "/retrieveListing/" + productId).pipe
		(
			catchError(this.handleError)
		);
	}
	
	  //Retrieve all Listings by customer Id
	getListingsByCustomerId(customerId: string): Observable<any> {
    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.get<any>(path + "/retrieveByCustomerId/" + customerId).pipe
      (
      catchError(this.handleError)
      );
  }
	
	createListing(newListing: Listing): Observable<any> {
		let path: string = '';
		
		if(this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}
		
		//have to link with user account
		let createProductReq = {
			"Listing": newListing
		};
		
		return this.httpClient.put<any>(path, createProductReq, httpOptions).pipe
		(
			catchError(this.handleError)
		);
	}

	updateListing(ListingToUpdate: Listing): Observable<any> {
		let path: string = '';
		
		if(this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}
		
		//have to link with user account
		let updateBookReq = {
			"ListingEntity": ListingToUpdate
		};
		
		return this.httpClient.post<any>(path, updateBookReq, httpOptions).pipe
		(
			catchError(this.handleError)
		);
	}

	deleteListing(ListingId: number): Observable<any> {
		let path: string = '';
		
		if(this.platform.is('core') || this.platform.is('mobileweb')) {
			path = this.baseUrl;
		}
		else {
			path = this.fullBaseUrl;
		}
		
		return this.httpClient.delete<any>(path + "/" + ListingId).pipe
		(			
			catchError(this.handleError)
		);
	}
	
	
	
	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) 
		{		
			console.error('An unknown error has occurred:', error.error.message);
		} 
		else 
		{		
			console.error(" A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error.message}`);
		}
		
		return new ErrorObservable(error);
	}
	
	  //Search by category
  searchByCategory(category: string): Observable<any> {
    let path: string = '';

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      path = this.baseUrl;
    }
    else {
      path = this.fullBaseUrl;
    }

    return this.httpClient.get<any>(path + "/retrieveByCategory/" + category).pipe
      (
      catchError(this.handleError)
      );
  }
}
