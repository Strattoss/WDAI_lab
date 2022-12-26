import { InterpolationConfig } from '@angular/compiler';
import { ComponentRef, Injectable } from '@angular/core';
import { Trip } from '../../assets/interfaces/trip';
import { TripTileComponent } from './trip-tile/trip-tile.component';

@Injectable({
  providedIn: 'root'
})

export class TripsToDistinguishService {
  private tripTiles: TripTileComponent[] = [];
  private redBorder?: TripTileComponent;
  private greenBorder?: TripTileComponent;

  constructor() { }

  signUp(obj: TripTileComponent) {
    this.tripTiles.push(obj);
  }

  signOff(obj: TripTileComponent) {
    this.tripTiles.splice(this.tripTiles.indexOf(obj), 1);
    this.updateGreenRedBorders();
  }

  updateGreenRedBorders() {
    this.sortByUnitPrice();

    for (let i = this.tripTiles.length - 1; i >= 0; i--) {
      let trip = this.tripTiles[i].trip;
      if (trip != undefined && trip.freeSeats - this.tripTiles[i].numOfReservations > 0) {
        if (this.redBorder != undefined) {
          this.redBorder.ifBorderRed = false;
        }
        this.redBorder = this.tripTiles[i];
        this.redBorder.ifBorderRed = true;
        break;
      }
    }

    for (let i = 0; i < this.tripTiles.length; i++) {
      let trip = this.tripTiles[i].trip;
      if (trip != undefined && trip.freeSeats - this.tripTiles[i].numOfReservations > 0) {
        if (this.greenBorder != undefined) {
          this.greenBorder.ifBorderGreen = false;
        }
        this.greenBorder = this.tripTiles[i];
        this.greenBorder.ifBorderGreen = true;
        break;
      }
    }
  }

  sortByUnitPrice() {
    this.tripTiles = this.tripTiles.sort((a, b) => {
      if (a.trip == undefined) { return -1 };
      if (b.trip == undefined) { return 1 };
      return b.trip.unitPrice - a.trip.unitPrice;
    });
  }


}
