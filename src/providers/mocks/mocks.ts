import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MocksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MocksProvider {
  listingPhotos: String[];
  profilePhotos: String[];

  constructor(public http: HttpClient) {
    this.listingPhotos = ["assets/imgs/listing1.jpg", "assets/imgs/listing2.jpg", "assets/imgs/listing3.jpg", "assets/imgs/listing4.jpg", "assets/imgs/listing5.jpg", "assets/imgs/listing6.jpg"];
  }

  getListingPhotos() {
    return this.listingPhotos;
  }
}
