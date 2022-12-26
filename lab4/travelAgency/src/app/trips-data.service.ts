import { Injectable } from '@angular/core';
import { Trips } from './mock-trips';
import { Trip } from './trip';
import { TripsToDistinguishService } from './tripComponents/trips-to-distinguish.service';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {
  trips: Trip[] = new Array<Trip>();
  constructor(public tripsToDistinguish: TripsToDistinguishService) {
    this.onInit();
  }

  onInit() {
    this.trips = Trips;
  }

  getTrips() {
    return Promise.resolve(this.trips);
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
    this.tripsToDistinguish.updateGreenRedBorders();
  }

  deleteTrip(trip: Trip) {
    console.log("deleting");
    this.trips.forEach((value, index) => {
      if (value.name == trip.name) this.trips.splice(index, 1);
    });
    this.tripsToDistinguish.updateGreenRedBorders();
  }
}
