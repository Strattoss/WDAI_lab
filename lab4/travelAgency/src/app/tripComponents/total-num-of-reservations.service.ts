import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalNumOfReservationsService {
  numOfReservations = 0;

  constructor() { }

  deltaNumOfReservations(delta: number) {
    this.numOfReservations += delta;
  }

  getColor() {
    if (this.numOfReservations > 10) {return '#54C74A'};
    if (this.numOfReservations <= 10) {return '#eb7575'};
    return '';
  }

  getNumOfReservations() {
    return this.numOfReservations;
  }
}
