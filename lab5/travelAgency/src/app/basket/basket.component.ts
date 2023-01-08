import { Component } from '@angular/core';
import { Trip } from 'src/assets/interfaces/trip';
import { BasketService } from '../basket.service';
import { TripsDataService } from '../trips-data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  reservations: Array<[Trip, number]>;

  constructor(public basket:BasketService, public tripsData: TripsDataService) {
    this.reservations = basket.getReservations();
  }

}
