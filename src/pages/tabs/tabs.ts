import { Component } from '@angular/core';
import { ItemPage } from '../item/item' ;
import { HomePage } from '../home/home';
import { LandingPage } from '../landing/landing';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = ItemPage;
  tab4Root = LandingPage;

  constructor() {

  }
}
