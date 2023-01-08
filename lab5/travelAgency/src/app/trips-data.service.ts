import { Injectable } from '@angular/core';
import { Trip } from '../assets/interfaces/trip';
import { TripsToDistinguishService } from './tripComponents/trips-to-distinguish.service';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map, Observable, filter, find } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {
  trips: Trip[] = new Array<Trip>();

  constructor(private db:AngularFireDatabase , public tripsToDistinguish: TripsToDistinguishService) {
    this.getTrips().subscribe(trips => this.trips = trips);
  }

  getTrips() {
    return this.db.list('trips').valueChanges().pipe(map(obj => obj as Trip[]));
  }

  getTripById(id: number): Observable<Trip> {
    return this.db.object('trips/'+id).valueChanges() as Observable<Trip>;
  }

  getIdByTrip(trip: Trip) {
    for(let i in this.trips) {
      if (this.tripsEqual(this.trips[i], trip)) {
        return Number.parseInt(i);
      }
    };
    return undefined;
  }

  //todo: change it
  addTrip(trip: Trip) {
    this.trips.push(trip);
    this.tripsToDistinguish.updateGreenRedBorders();
  }

  //todo: change it
  deleteTrip(trip: Trip) {
    this.trips.forEach((value, index) => {
      if (value.name == trip.name) this.trips.splice(index, 1);
    });
    this.tripsToDistinguish.updateGreenRedBorders();
  }

  private tripsEqual(a: Trip, b: Trip) {
    if (a.description == b.description &&
      a.destination == b.destination &&
      a.endDate == b.endDate &&
      a.freeSeats == b.freeSeats &&
      a.name == b.name &&
      a.startDate == b.startDate &&
      a.unitPrice == b.unitPrice) {
      return true;
    } else {
      return false;
    }
  }
}
