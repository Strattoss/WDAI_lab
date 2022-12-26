import { Component } from '@angular/core';
import { TotalNumOfReservationsService } from '../total-num-of-reservations.service';

@Component({
  selector: 'app-total-reservations',
  templateUrl: './total-reservations.component.html',
  styleUrls: ['./total-reservations.component.css']
})
export class TotalReservationsComponent {
  constructor (public totalNumOfReservations: TotalNumOfReservationsService) {}
}
