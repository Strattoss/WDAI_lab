import { Injectable } from '@angular/core';
import { Trip } from '../assets/interfaces/trip';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {
  tripsAndIds?: [Trip, number][] = [];

  constructor(private db: AngularFireDatabase) {
    this.getTripsAndIds$().subscribe(x => this.tripsAndIds = x);
    this.getTripsAndIds$();
  }

  getTrips$(): Observable<Trip[]> {
    return this.db.list('trips').valueChanges().pipe(map(obj => obj as Trip[]));
  }

  // change name to getTripsAndIds$
  getTripsAndIds$(): Observable<[Trip, number][]> {
    let a = this.db.list('trips').snapshotChanges().pipe(
      map(x => x.map(y => [y.payload.val(), y.key ? Number.parseInt(y.key) : null] as [Trip, number|null]).filter(z => z[1] != null) as [Trip, number][]));
    return a;
  }

  getTrip$ById(id: number): Observable<Trip | null> {
    return this.db.object<Trip>('trips/' + id).valueChanges();
  }

  //todo: change it
  addTrip(trip: Trip) {
    //this.trips.push(trip);
    //this.tripsToDistinguish.updateGreenRedBorders();
  }

  deleteTrip(id: number) {
    this.db.object('trips/'+id).remove();
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
