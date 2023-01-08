import { Injectable } from '@angular/core';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsDataService } from './trips-data.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private reservations: Array<[Trip, number]> = new Array();

  constructor(private tripsData: TripsDataService ) { }

  getNumOfReservations(trip: Trip): number {
    let correctTrip: [Trip, number] | undefined = this.reservations.find(val => this.tripsEqual(val[0], trip));
    if (correctTrip == undefined) {return 0;}
    return correctTrip[1];
  }

  addReservation(trip: Trip): void {
    let correctTrip: [Trip, number] | undefined = this.reservations.find(val => this.tripsEqual(val[0], trip));
    if (correctTrip == undefined) {
      this.reservations.push([trip, 1]);
      return;
    }

    correctTrip[1]++;
  }

  removeReservation(trip: Trip): void {
    let correctTrip: [Trip, number] | undefined = this.reservations.find(val => this.tripsEqual(val[0], trip));
    if (correctTrip == undefined) {return;}
    if (correctTrip[1] == 1) {
      let start = this.reservations.indexOf(correctTrip);
      this.reservations.splice(start, 1);
      return;
    }
    correctTrip[1]--;
  }

  getSumOfReservationsMoney() {
    return this.reservations.reduce((acc, curr) => acc + curr[0].unitPrice * curr[1], 0);
  }

  getSumOfReservationsNum() {
    return this.reservations.map(tr => tr[1]).reduce((acc, curr) => acc + curr, 0);
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

  getReservations() {
    return this.reservations;
  }
}

