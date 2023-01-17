import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from 'src/assets/interfaces/reservation';
import { Trip } from 'src/assets/interfaces/trip';
import { BasketService } from './basket.service';
import { TripsDataService } from './trips-data.service';

@Injectable({
  providedIn: 'root'
})

export class TripsToDistinguishService {
  private tripsAndIds: [Trip, number][] = [];
  private reservations?: Reservation[];

  private redBorderId: number = 0; // id of appropiate trip
  private redBorderId$: BehaviorSubject<number> = new BehaviorSubject<number>(this.redBorderId);

  private greenBorderId: number = 0; // id of appropiate trip
  private greenBorderId$: BehaviorSubject<number> = new BehaviorSubject<number>(this.greenBorderId);

  constructor(public basket: BasketService, public tripsData: TripsDataService) {
    this.basket.getReservations$().subscribe(v => {
      this.reservations = v;
      this.updateBorders();
    })

    this.tripsData.getTripsAndIds$().subscribe(v => {
      this.tripsAndIds = v;
      this.updateBorders();
    });
  }

  getRedBorder$(): BehaviorSubject<number> {
    return this.redBorderId$;
  }

  getGreenBorder$(): BehaviorSubject<number> {
    return this.greenBorderId$;
  }

  iterate() {
    this.greenBorderId++;
    this.greenBorderId$.next(this.greenBorderId);
  }

  updateBorders() {
    this.tripsAndIds = this.sortByUnitPrice(this.tripsAndIds);

    for (let x of this.tripsAndIds) {
      let madeReservations = this.reservations?.find(y => y.id == x[1])?.numOfReservations;
      if (madeReservations != x[0].freeSeats) {
        this.greenBorderId = x[1];
        this.greenBorderId$.next(this.greenBorderId)
        break;
      }
    }

    for (let x of this.tripsAndIds.slice().reverse()) {
      let madeReservations = this.reservations?.find(y => y.id == x[1])?.numOfReservations;
      if (madeReservations != x[0].freeSeats) {
        this.redBorderId = x[1];
        this.redBorderId$.next(this.redBorderId)
        break;
      }
    }
  }

  sortByUnitPrice(tripsAndIds: [Trip, number][]) {
    return tripsAndIds.sort((a, b) => { return b[0].unitPrice - a[0].unitPrice; })
  }

}
