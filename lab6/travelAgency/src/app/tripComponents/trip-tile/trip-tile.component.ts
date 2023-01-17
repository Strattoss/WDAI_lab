import { Component, Input } from '@angular/core';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsToDistinguishService } from 'src/app/trips-to-distinguish.service';
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
  trip?: Trip | null;
  trip$?: Observable<Trip | null>;
  numOfReservations = 0;

  borderRed?: number; // id of trip that should be red
  borderGreen?: number; // id of trip that should be green
  

  constructor(public tripsToDistinguish: TripsToDistinguishService,
    public tripsDataService: TripsDataService,
    public router: Router,
    public basket: BasketService) { }

  ngOnInit() {
    this.tripsToDistinguish.getRedBorder$().subscribe(v => {
      this.borderRed = v
    });
    this.tripsToDistinguish.getGreenBorder$().subscribe(v => {
      this.borderGreen = v
    });

    if (this.tripId != undefined) {
      this.trip$ = this.tripsDataService.getTrip$ById(this.tripId);
      this.trip$.subscribe(val => {
        this.trip = val;
        if (this.tripId != undefined) {
          this.numOfReservations = this.basket.getTripReservations(this.tripId);
        }
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

    if ( this.tripId == undefined) {return;}
    
    if (n > 0) {
      this.basket.addReservation(this.tripId);
    } else {
      this.basket.removeReservation(this.tripId);
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
    if (this.tripId != undefined) {
      this.tripsDataService.deleteTrip(this.tripId);
    }
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
    return sum / n;
  }

  getAverageRatingDivisor() {
    return Math.round(this.getAverageRating()) - 1;
  }

}
