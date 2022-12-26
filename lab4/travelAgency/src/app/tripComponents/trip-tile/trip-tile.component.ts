import { Component, Input, AfterViewChecked } from '@angular/core';
import { Trip } from 'src/app/trip';
import { TripsToDistinguishService } from '../trips-to-distinguish.service';
import { TotalNumOfReservationsService } from '../total-num-of-reservations.service';

@Component({
  selector: 'app-trip-tile',
  templateUrl: './trip-tile.component.html',
  styleUrls: ['./trip-tile.component.css']
})
export class TripTileComponent {
  @Input() public trip?: Trip;
  showDescription = false;
  numOfReservations = 0;

  constructor(public tripsToDistinguish: TripsToDistinguishService, public totalNumOfReservations: TotalNumOfReservationsService) {}

  ngOnInit() {
    this.tripsToDistinguish.signUp(this);
  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  deltaReservation(n: number) {
    if (this.trip == undefined ||
      this.numOfReservations + n < 0 ||
      this.numOfReservations + n > this.trip.freeSeats) {
        return;
      }
    this.numOfReservations += n;
    this.tripsToDistinguish.updateGreenRedBorders();
    this.totalNumOfReservations.deltaNumOfReservations(n);
  }

  ifFreeSeatsAvailible() {
    if (this.trip == undefined) {
      return false;
    }
    return this.trip.freeSeats - this.numOfReservations > 0;
  }

  ifYellow() {
    if (this.trip == undefined) {
      return false;
    }
    return this.trip.freeSeats - this.numOfReservations <= 10 && this.trip.freeSeats - this.numOfReservations >= 4;
  }

  ifRed() {
    if (this.trip == undefined) {
      return false;
    }
    return !this.ifYellow() && this.trip.freeSeats - this.numOfReservations <= 3;
  }

  afterViewChecked() {
    this.tripsToDistinguish.updateGreenRedBorders();
  }

}
