import { Component } from '@angular/core';
import { Reservation } from 'src/assets/interfaces/reservation';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  reservations: Reservation[] = [];
  sumOfReservationsNum = 0;
  sumOfReservationsMoney = 0

  constructor(private basket:BasketService) {
    this.basket.getReservations$().subscribe(v => this.reservations = v);
    basket.getSumOfReservationsMoney$().subscribe(v => this.sumOfReservationsMoney = v);
    basket.getSumOfReservationsNum$().subscribe(v => this.sumOfReservationsNum = v);
  }

  buyTickets() {
    this.basket.buyTickets();
  }

}
