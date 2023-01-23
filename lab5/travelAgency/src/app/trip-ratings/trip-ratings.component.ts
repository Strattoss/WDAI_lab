import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsDataService } from '../trips-data.service';

@Component({
  selector: 'app-trip-ratings',
  templateUrl: './trip-ratings.component.html',
  styleUrls: ['./trip-ratings.component.css']
})
export class TripRatingsComponent implements OnInit {
  @Input() tripId?:number;
  trip?: Trip;

  constructor (public tripsData: TripsDataService) {}

  ngOnInit(): void {
    if (this.tripId != undefined) {
      this.tripsData.getTripById(this.tripId).subscribe(v => this.trip = v);
    }
    
  }
}