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
    if (this.numOfReservations > 10) {return 'green'};
    if (this.numOfReservations <= 10) {return 'red'};
    return '';
  }

  getNumOfReservations() {
    return this.numOfReservations;
  }
}
