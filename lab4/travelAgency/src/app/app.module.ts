import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TripsListComponent } from './tripComponents/trips-list/trips-list.component';
import { TripTileComponent } from './tripComponents/trip-tile/trip-tile.component';
import { TripFormComponent } from './addRemoveTrips/trip-form/trip-form.component';
import { TotalReservationsComponent } from './tripComponents/total-reservations/total-reservations.component';
import { TripRatingComponent } from './tripComponents/trip-rating/trip-rating.component';
import { StarComponent } from './tripComponents/trip-rating/star/star.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsListComponent,
    TripTileComponent,
    TripFormComponent,
    TotalReservationsComponent,
    TripRatingComponent,
    StarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
