import { InterpolationConfig } from '@angular/compiler';
import { ComponentRef, Injectable } from '@angular/core';
import { Trip } from '../trip';
import { TripTileComponent } from './trip-tile/trip-tile.component';

@Injectable({
  providedIn: 'root'
})

export class TripsToDistinguishService {
  

  tripTiles: TripTileComponent[] = [];
  redBorder?: TripTileComponent;
  greenBorder? :TripTileComponent;
  
  constructor() {}

  signUp(obj: TripTileComponent) {
    this.tripTiles.push(obj);
  }

  getsGreenBorder(obj: TripTileComponent) {
    return this.greenBorder == obj;
  }

  getsRedBorder(obj: TripTileComponent) {
    return this.redBorder == obj;
  }

  updateGreenRedBorders() {
    this.sortByUnitPrice();

    for (let i = 0; i < this.tripTiles.length; i++) {
      let trip = this.tripTiles[i].trip;
      if (trip != undefined && trip.freeSeats - this.tripTiles[i].numOfReservations > 0) {
        this.redBorder = this.tripTiles[i];
        break;
      }
    }

    for (let i = this.tripTiles.length - 1; i >= 0; i--) {
      let trip = this.tripTiles[i].trip;
      if (trip != undefined && trip.freeSeats - this.tripTiles[i].numOfReservations > 0) {
        this.greenBorder = this.tripTiles[i];
        break;
      }
    }
  }

  sortByUnitPrice() {
    this.tripTiles =  this.tripTiles.sort((a, b) => {
      if (a.trip == undefined) {return -1};
      if (b.trip == undefined) {return 1};
      return b.trip.unitPrice - a.trip.unitPrice;
    });
  }
  

}

interface TripObject {
  trip: Trip, numOfReservations: number
}