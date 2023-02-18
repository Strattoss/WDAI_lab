import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from 'src/assets/interfaces/reservation';
import { Roles } from 'src/assets/interfaces/roles';
import { Trip } from 'src/assets/interfaces/trip';
import { TripId } from 'src/assets/types/tripId';
import { FbAuthService } from './fb-auth.service';
import { FbDatabaseService } from './fb-database.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  currentUserRoles: Roles | null = null;

  private tripsAndIds: [Trip, TripId][] = [];
  private reservations: Reservation[] = [];
  private reservations$ = new BehaviorSubject<Reservation[]>(this.reservations);

  // stats for basket component
  private sumOfReservationsMoney: number = 0;
  private sumOfReservationsNum: number = 0;

  private sumOfReservationsMoney$: BehaviorSubject<number> = new BehaviorSubject<number>(this.sumOfReservationsMoney);
  private sumOfReservationsNum$: BehaviorSubject<number> = new BehaviorSubject<number>(this.sumOfReservationsNum);

  constructor(private fbData: FbDatabaseService, private fbAuth: FbAuthService, afAuth: AngularFireAuth) {
    this.fbData.getTripsAndIds$().subscribe(v => this.tripsAndIds = v);
    afAuth.authState.subscribe(x => {
      this.clearBasket();
    })

    fbAuth.getCurrentUserRoles$().subscribe(x => this.currentUserRoles = x);
  }

  getTripReservations(id: TripId): number {
    if (id == undefined || id == null) { return 0; }

    let correctTrip = this.reservations.find(x => x.tripId == id)
    if (correctTrip == undefined) { return 0; }
    return correctTrip.tickets;
  }

  getReservations$(): BehaviorSubject<Reservation[]> {
    return this.reservations$;
  }

  private findReservation(id: TripId): Reservation | undefined {
    return this.reservations.find(x => x.tripId == id);
  }

  addReservation(id: TripId) {
    if (!this.currentUserRoles?.client) {
      throw new Error("Cannot add trips to basket, because you don't have 'client' role");
    }
    let correctTrip = this.findReservation(id);
    if (correctTrip == undefined) {
      this.reservations.push({ tripId: id, tickets: 1 });
    }
    else {
      correctTrip.tickets++;
    }

    this.updateEverything();
  }

  removeReservation(id: TripId) {
    let correctTrip = this.findReservation(id);
    if (correctTrip == undefined) { return; }
    if (correctTrip.tickets == 1) {
      let start = this.reservations.indexOf(correctTrip);
      this.reservations.splice(start, 1);

    }
    else {
      correctTrip.tickets--;
    }

    this.updateEverything();
  }

  updateEverything() {
    this.reservations$.next(this.reservations);

    this.sumOfReservationsMoney = this.getSumOfReservationsMoney();
    this.sumOfReservationsNum = this.getSumOfReservationsNum();

    this.sumOfReservationsMoney$.next(this.sumOfReservationsMoney);
    this.sumOfReservationsNum$.next(this.sumOfReservationsNum);
  }

  getSumOfReservationsMoney() {
    let sumMoney = 0;
    this.reservations.forEach(x => {
      let unitPr = this.tripsAndIds.find(y => y[1] == x.tripId)?.[0].unitPrice;
      if (unitPr != undefined) {
        sumMoney += unitPr * x.tickets;
      }
    })
    return sumMoney;
  }

  getSumOfReservationsNum() {
    let sumNum = 0;
    this.reservations.forEach(x => sumNum += x.tickets);
    return sumNum;
  }

  getSumOfReservationsMoney$() {
    return this.sumOfReservationsMoney$;
  }

  getSumOfReservationsNum$() {
    return this.sumOfReservationsNum$;
  }

  buyTickets() {
    this.reservations.forEach(x => {
      this.fbData.addPurchase(x.tripId, x.tickets);
    })
    this.clearBasket();
  }

  clearBasket() {
    this.reservations = [];
    this.updateEverything();
  }

}

