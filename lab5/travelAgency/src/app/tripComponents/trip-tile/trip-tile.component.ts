import { Component, Input } from '@angular/core';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsToDistinguishService } from '../trips-to-distinguish.service';
import { TripsDataService } from 'src/app/trips-data.service';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-trip-tile',
  templateUrl: './trip-tile.component.html',
  styleUrls: ['./trip-tile.component.css']
})
export class TripTileComponent {
  @Input() public tripId?: number;
  trip?: Trip;
  tripObs?: Observable<Trip>;
  numOfReservations = 0;

  ifBorderGreen = false;
  ifBorderRed = false;

  constructor(public tripsToDistinguish: TripsToDistinguishService,
    public tripsDataService: TripsDataService,
    public router: Router,
    public basket: BasketService) { }

  ngOnInit() {
    this.tripsToDistinguish.signUp(this);
    if (this.tripId != undefined) {
      this.tripObs = this.tripsDataService.getTripById(this.tripId);
      this.tripObs.subscribe(val => {
        this.trip = val;
        this.numOfReservations = this.basket.getNumOfReservations(this.trip);
      });
    }
  }

  deltaReservation(n: number) {
    if (!this.trip ||
      this.numOfReservations + n < 0 ||
      this.numOfReservations + n > this.trip.freeSeats) {
      return;
    }
    this.numOfReservations += n;
    this.tripsToDistinguish.updateGreenRedBorders();
    if (n > 0) {
      this.basket.addReservation(this.trip);
    } else {
      this.basket.removeReservation(this.trip);
    }
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

  removeThisTrip() {
    if (this.trip == undefined) { return; }
    this.deltaReservation(-this.numOfReservations);
    this.tripsToDistinguish.signOff(this);
    this.tripsDataService.deleteTrip(this.trip);
    this.tripsToDistinguish.updateGreenRedBorders();
  }

  showTripDetails() {
    this.router.navigate([`/trip-details/${this.tripId}`])
  }

  getAverageRating() {
    let sum = 0;
    let n = 0;
    this.trip?.ratings.forEach((val, i) => {
      sum += val * (i + 1);
      n += val;
    }
    );
    return sum/n;
  }

  getAverageRatingDivisor() {
    return Math.round(this.getAverageRating())-1;
  }

}
