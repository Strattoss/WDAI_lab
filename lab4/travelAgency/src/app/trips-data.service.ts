import { Injectable } from '@angular/core';
import { Trips } from '../assets/data/mock-trips';
import { Trip } from '../assets/interfaces/trip';
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
    this.trips.forEach((value, index) => {
      if (value.name == trip.name) this.trips.splice(index, 1);
    });
    this.tripsToDistinguish.updateGreenRedBorders();
  }
}
