import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from 'src/assets/interfaces/reservation';
import { Trip } from 'src/assets/interfaces/trip';
import { TripId } from 'src/assets/types/tripId';
import { BasketService } from './basket.service';
import { FbDatabaseService } from './fb-database.service';

@Injectable({
  providedIn: 'root'
})

export class TripsToDistinguishService {
  private tripsAndIds: [Trip, TripId][] = [];
  private reservations?: Reservation[];

  private redBorderId: TripId = ""; // id of appropiate trip
  private redBorderId$: BehaviorSubject<TripId> = new BehaviorSubject<TripId>(this.redBorderId);

  private greenBorderId: TripId = ""; // id of appropiate trip
  private greenBorderId$: BehaviorSubject<TripId> = new BehaviorSubject<TripId>(this.greenBorderId);

  constructor(public basket: BasketService, public fbData: FbDatabaseService) {
    this.basket.getReservations$().subscribe(v => {
      this.reservations = v;
      this.updateBorders();
    })

    this.fbData.getTripsAndIds$().subscribe(v => {
      this.tripsAndIds = v;
      this.updateBorders();
    });
  }

  getRedBorder$(): BehaviorSubject<TripId> {
    return this.redBorderId$;
  }

  getGreenBorder$(): BehaviorSubject<TripId> {
    return this.greenBorderId$;
  }

  updateBorders() {
    this.tripsAndIds = this.sortByUnitPrice(this.tripsAndIds);

    for (let x of this.tripsAndIds) {
      let madeReservations = this.reservations?.find(y => y.id == x[1])?.tickets;
      if (madeReservations != x[0].freeSeats) {
        this.greenBorderId = x[1];
        this.greenBorderId$.next(this.greenBorderId)
        break;
      }
    }

    for (let x of this.tripsAndIds.slice().reverse()) {
      let madeReservations = this.reservations?.find(y => y.id == x[1])?.tickets;
      if (madeReservations != x[0].freeSeats) {
        this.redBorderId = x[1];
        this.redBorderId$.next(this.redBorderId)
        break;
      }
    }
  }

  sortByUnitPrice(tripsAndIds: [Trip, TripId][]) {
    return tripsAndIds.sort((a, b) => { return b[0].unitPrice - a[0].unitPrice; })
  }

}
