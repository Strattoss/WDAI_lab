import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/assets/interfaces/trip';
import { TripId } from 'src/assets/interfaces/tripId';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-trip-ratings',
  templateUrl: './trip-ratings.component.html',
  styleUrls: ['./trip-ratings.component.css']
})
export class TripRatingsComponent implements OnInit {
  @Input() tripId?: TripId;
  tripObs?: Observable<Trip | null>

  constructor (public fbData: FbDatabaseService) {}

  ngOnInit(): void {
    if (this.tripId != undefined) {
      this.tripObs = this.fbData.getTrip$ById(this.tripId);
    }
    
  }
}
