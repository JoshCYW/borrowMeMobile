import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { ItemPage } from '../pages/item/item';
import { SearchPage } from '../pages/search/search';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListingProvider } from '../providers/listing/listing';
import { FilterProvider } from '../providers/filter/filter';
import { CustomerProvider } from '../providers/customer/customer';
import { RequestProvider } from '../providers/request/request';
import { HowToBorrowPage } from '../pages/how-to-borrow/how-to-borrow';
import { EditListingPage } from '../pages/edit-listing/edit-listing';
import { ViewRequestDetailPage } from '../pages/view-request-detail/view-request-detail';
import { RequestFormPage } from '../pages/request-form/request-form';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfileUpdatePage } from '../pages/profile-update/profile-update';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { SafetyTipsPage } from '../pages/safety-tips/safety-tips';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { GettingStartedGuidePage } from '../pages/getting-started-guide/getting-started-guide';
import { OffersMadePage } from '../pages/offers-made/offers-made';
import { OffersReceivedPage } from '../pages/offers-received/offers-received';
import { ViewListingDetailPage } from '../pages/view-listing-detail/view-listing-detail';
import { CreateListingPage } from '../pages/create-listing/create-listing';
import { FrontPage } from '../pages/front/front';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    ProfileUpdatePage,
    ProfilePage,
    SettingsPage,
    SafetyTipsPage,
    ChangePasswordPage,
    GettingStartedGuidePage,
    OffersMadePage,
    OffersReceivedPage,
    ViewListingDetailPage,
    CreateListingPage,
    LandingPage,
    ItemPage,
    SearchPage,
    TabsPage,
    HowToBorrowPage,
    RequestFormPage,
    ViewRequestDetailPage,
    EditListingPage,
    FrontPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage, //useless page
    HomePage,
    LoginPage,
    SignupPage,
    ProfileUpdatePage,
    ProfilePage,
    SettingsPage,
    SafetyTipsPage,
    ChangePasswordPage,
    GettingStartedGuidePage,
    OffersMadePage,
    OffersReceivedPage,
    ViewListingDetailPage,
    CreateListingPage,
    LandingPage,
    ItemPage,
    SearchPage,
    TabsPage,
    HowToBorrowPage,
    RequestFormPage,
    ViewRequestDetailPage,
    EditListingPage,
    FrontPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ListingProvider,
    FilterProvider,
    CustomerProvider,
    RequestProvider
  ]
})
export class AppModule { }
