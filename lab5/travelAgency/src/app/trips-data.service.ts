import { Injectable } from '@angular/core';
import { Trip } from '../assets/interfaces/trip';
import { TripsToDistinguishService } from './tripComponents/trips-to-distinguish.service';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {
  tripsAndIds?: [Trip, number][] = [];

  constructor(private db: AngularFireDatabase, public tripsToDistinguish: TripsToDistinguishService) {
    this.getTripsAndIdsObservable().subscribe(x => {
      this.tripsAndIds = [];
      x.forEach(y => {
        if (y.key == null || y.payload.val() == null) { return };
        this.tripsAndIds?.push([y.payload.val() as Trip, Number.parseInt(y.key)]);
      });
    }
    );
    this.getTripsAndIdsObservable();
  }

  getTripsObservable(): Observable<Trip[]> {
    return this.db.list('trips').valueChanges().pipe(map(obj => obj as Trip[]));
  }

  getTripsAndIdsObservable() {
    return this.db.list('trips').snapshotChanges();
  }

  getTripsAndIds(): [Trip, number][] | undefined {
    return this.tripsAndIds;
  }

  getTripById(id: number): Observable<Trip> {
    return this.db.object<Trip>('trips/' + id).valueChanges() as Observable<Trip>;
  }

  getIdByTrip(trip: Trip) {
    let tmp;
    this.tripsAndIds?.forEach(x => {
      if (this.tripsEqual(x[0], trip)) {
        tmp = x[1];
      }
    })
    return tmp;

  }

  //todo: change it
  addTrip(trip: Trip) {
    //this.trips.push(trip);
    //this.tripsToDistinguish.updateGreenRedBorders();
  }

  deleteTrip(id: number) {
    console.log("removing trip with id " + id);
    
    this.db.object('trips/'+id).remove();
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
