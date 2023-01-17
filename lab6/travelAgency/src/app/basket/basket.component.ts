import { Component } from '@angular/core';
import { Reservation } from 'src/assets/interfaces/reservation';
import { Trip } from 'src/assets/interfaces/trip';
import { BasketService } from '../basket.service';
import { TripsDataService } from '../trips-data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  reservations: Reservation[] = [];
  sumOfReservationsNum = 0;
  sumOfReservationsMoney = 0

  constructor(public basket:BasketService, public tripsData: TripsDataService) {
    this.basket.getReservations$().subscribe(v => this.reservations = v);
    basket.getSumOfReservationsMoney$().subscribe(v => this.sumOfReservationsMoney = v);
    basket.getSumOfReservationsNum$().subscribe(v => this.sumOfReservationsNum = v);
  }

}
