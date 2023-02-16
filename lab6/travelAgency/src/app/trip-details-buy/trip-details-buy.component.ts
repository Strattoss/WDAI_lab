import { Component, Input } from '@angular/core';
import { Trip } from 'src/assets/interfaces/trip';
import { TripId } from 'src/assets/types/tripId';
import { BasketService } from '../services/basket.service';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-trip-details-buy',
  templateUrl: './trip-details-buy.component.html',
  styleUrls: ['./trip-details-buy.component.css']
})
export class TripDetailsBuyComponent {
  @Input() tripId?: TripId;
  trip?: Trip;

  numOfReservations = 0;

  constructor(private basket: BasketService,
    private fbData: FbDatabaseService) { }

  ngOnInit() {
    if (this.tripId == undefined) { return; }
    this.fbData.getTrip$ById(this.tripId).subscribe(x => {
      if (x == null) { return; }
      this.trip = x;
    })
    this.numOfReservations = this.basket.getTripReservations(this.tripId)
  }

  ifFreeSeatsAvailible() {
    if (this.trip == undefined) {
      return false;
    }
    return this.trip.freeSeats - this.numOfReservations > 0;
  }

  ifYellow() {
    if (this.trip == undefined) {
      return false;
    }
    return this.trip.freeSeats - this.numOfReservations <= 10 && this.trip.freeSeats - this.numOfReservations >= 4;
  }

  ifRed() {
    if (this.trip == undefined) {
      return false;
    }
    return !this.ifYellow() && this.trip.freeSeats - this.numOfReservations <= 3;
  }

  deltaReservation(n: number) {
    if (!this.trip ||
      this.numOfReservations + n < 0 ||
      this.numOfReservations + n > this.trip.freeSeats) {
      return;
    }
    this.numOfReservations += n;

    if (this.tripId == undefined) { return; }

    if (n > 0) {
      this.basket.addReservation(this.tripId);
    } else {
      this.basket.removeReservation(this.tripId);
    }
  }

}
