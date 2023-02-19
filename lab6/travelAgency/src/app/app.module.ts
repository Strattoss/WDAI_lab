import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { firebaseConfig } from '../environments/environment';

// locales
import locale from '@angular/common/locales/en-GB';
import { registerLocaleData } from '@angular/common';
registerLocaleData(locale, 'en-GB')

// guards
import { AdminGuard } from './guard/admin.guard';
import { ClientGuard } from './guard/client.guard';
import { GuestGuard } from './guard/guest.guard';
import { ManagerGuard } from './guard/manager.guard';
import { NotGuestGuard } from './guard/not-guest.guard';

// components
import { AppComponent } from './app.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { TripTileComponent } from './trip-tile/trip-tile.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { StarComponent } from './trip-rating/star/star.component';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { TripHistoryComponent } from './purchase-history/purchase-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { TripDetailsGuard } from './guard/trip-details.guard';
import { TripDetailsReviewComponent } from './trip-details-review/trip-details-review.component';
import { TripDetailsBuyComponent } from './trip-details-buy/trip-details-buy.component';
import { TripDetailsRatingsComponent } from './trip-details-ratings/trip-details-ratings.component';
import { PurchaseHistoryTileComponent } from './purchase-history-tile/purchase-history-tile.component';
import { TripDetailsGalleryComponent } from './trip-details-gallery/trip-details-gallery.component';

// routes
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: 'trips-list', component: TripsListComponent },
  { path: 'trip-details/:tripId', component: TripDetailsComponent, canActivate: [TripDetailsGuard] },
  { path: 'manager-panel', component: ManagerPanelComponent, canActivate: [ManagerGuard]},
  { path: 'manager-panel/:tripId', component: TripFormComponent, canActivate: [ManagerGuard]},
  { path: 'basket', component: BasketComponent, canActivate: [ClientGuard]},
  { path: 'history', component: TripHistoryComponent, canActivate: [ClientGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'log-in', component: LogInComponent, canActivate: [GuestGuard] },
  { path: 'user-info', component: UserInfoComponent, canActivate: [NotGuestGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TripsListComponent,
    TripTileComponent,
    TripFormComponent,
    TripRatingComponent,
    StarComponent,
    HomeComponent,
    BasketComponent,
    TripHistoryComponent,
    NavBarComponent,
    TripDetailsComponent,
    RegisterComponent,
    LogInComponent,
    AdminPanelComponent,
    UserInfoComponent,
    ManagerPanelComponent,
    TripDetailsReviewComponent,
    TripDetailsBuyComponent,
    TripDetailsRatingsComponent,
    PurchaseHistoryTileComponent,
    TripDetailsGalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'en-GB'
  },
  {provide: DEFAULT_CURRENCY_CODE,
  useValue: 'EUR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
