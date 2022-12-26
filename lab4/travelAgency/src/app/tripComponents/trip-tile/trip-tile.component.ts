import { Component, Input, AfterViewChecked } from '@angular/core';
import { Trip } from 'src/app/trip';
import { TripsToDistinguishService } from '../trips-to-distinguish.service';
import { TotalNumOfReservationsService } from '../total-num-of-reservations.service';
import { TripsDataService } from 'src/app/trips-data.service';

@Component({
  selector: 'app-trip-tile',
  templateUrl: './trip-tile.component.html',
  styleUrls: ['./trip-tile.component.css']
})
export class TripTileComponent {
  @Input() public trip?: Trip;
  showDescription = false;
  numOfReservations = 0;

  ifBorderGreen = false;
  ifBorderRed = false;

  constructor(public tripsToDistinguish: TripsToDistinguishService,
    public totalNumOfReservations: TotalNumOfReservationsService,
    public tripsDataService: TripsDataService) {}

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

  removeThisTrip() {
    if (this.trip == undefined) {return;}
    this.deltaReservation(-this.numOfReservations);
    this.tripsToDistinguish.signOff(this);
    this.tripsDataService.deleteTrip(this.trip);
  }

}
