import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { firebaseConfig } from '../environments/environment';
import locale from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
registerLocaleData(locale, 'pl')

// guards
import { AdminGuard } from './guard/admin.guard';
import { ClientGuard } from './guard/client.guard';
import { GuestGuard } from './guard/guest.guard';
import { ManagerGuard } from './guard/manager.guard';
import { NotGuestGuard } from './guard/not-guest.guard';

// components
import { AppComponent } from './app.component';
import { TripsListComponent } from './tripComponents/trips-list/trips-list.component';
import { TripTileComponent } from './tripComponents/trip-tile/trip-tile.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TotalReservationsComponent } from './tripComponents/total-reservations/total-reservations.component';
import { TripRatingComponent } from './tripComponents/trip-rating/trip-rating.component';
import { StarComponent } from './tripComponents/trip-rating/star/star.component';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TripDetailsComponent } from './tripComponents/trip-details/trip-details.component';
import { TripRatingsComponent } from './trip-ratings/trip-ratings.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: 'trips-list', component: TripsListComponent },
  { path: 'trip-details/:tripId', component: TripDetailsComponent, canActivate: [ClientGuard] },
  { path: 'manager-panel', component: ManagerPanelComponent, canActivate: [ManagerGuard]},
  { path: 'manager-panel/add-trip', component: TripFormComponent, canActivate: [ManagerGuard]},
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
    TotalReservationsComponent,
    TripRatingComponent,
    StarComponent,
    HomeComponent,
    BasketComponent,
    TripHistoryComponent,
    NavBarComponent,
    TripDetailsComponent,
    TripRatingsComponent,
    RegisterComponent,
    LogInComponent,
    AdminPanelComponent,
    UserInfoComponent,
    ManagerPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pl'
  },
  {provide: DEFAULT_CURRENCY_CODE,
  useValue: 'PLN'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
