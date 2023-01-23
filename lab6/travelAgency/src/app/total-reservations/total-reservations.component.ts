import { Component } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-total-reservations',
  templateUrl: './total-reservations.component.html',
  styleUrls: ['./total-reservations.component.css']
})
export class TotalReservationsComponent {
  constructor (public basket: BasketService) {}
}
