import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from 'src/assets/interfaces/reservation';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsDataService } from './trips-data.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private tripsAndIds: [Trip, number][] = [];
  private reservations: Reservation[] = [];
  private reservations$ = new BehaviorSubject<Reservation[]>(this.reservations);

  // stats for basket component
  private sumOfReservationsMoney: number = 0;
  private sumOfReservationsNum: number = 0;

  private sumOfReservationsMoney$: BehaviorSubject<number> = new BehaviorSubject<number>(this.sumOfReservationsMoney);
  private sumOfReservationsNum$: BehaviorSubject<number> = new BehaviorSubject<number>(this.sumOfReservationsNum);

  constructor(private tripsData: TripsDataService) {
    this.tripsData.getTripsAndIds$().subscribe(v => this.tripsAndIds = v);
  }

  getTripReservations(id: number): number {
    if (id == undefined || id == null) { return 0; }

    let correctTrip = this.reservations.find(x => x.id == id)
    if (correctTrip == undefined) { return 0; }
    return correctTrip.numOfReservations;
  }

  getReservations$(): BehaviorSubject<Reservation[]> {
    return this.reservations$;
  }

  private findReservation(id: number): Reservation | undefined {
    return this.reservations.find(x => x.id == id);
  }

  addReservation(id: number) {
    let correctTrip = this.findReservation(id);
    if (correctTrip == undefined) {
      this.reservations.push({ id: id, numOfReservations: 1 });
    }
    else {
      correctTrip.numOfReservations++;
    }

    this.updateEverything();
  }

  removeReservation(id: number) {
    let correctTrip = this.findReservation(id);
    if (correctTrip == undefined) { return; }
    if (correctTrip.numOfReservations == 1) {
      let start = this.reservations.indexOf(correctTrip);
      this.reservations.splice(start, 1);

    }
    else {
      correctTrip.numOfReservations--;
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
      let unitPr = this.tripsAndIds.find(y => y[1] == x.id)?.[0].unitPrice;
      if (unitPr != undefined) {
        sumMoney += unitPr * x.numOfReservations;
      }
    })
    return sumMoney;
  }

  getSumOfReservationsNum() {
    let sumNum = 0;
    this.reservations.forEach(x => sumNum += x.numOfReservations);
    return sumNum;
  }

  getSumOfReservationsMoney$() {
    return this.sumOfReservationsMoney$;
  }

  getSumOfReservationsNum$() {
    return this.sumOfReservationsNum$;
  }

  // todo: remove
  getReservations() {
    return this.reservations;
  }

}

