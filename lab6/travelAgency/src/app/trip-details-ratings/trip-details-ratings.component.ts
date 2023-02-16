import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/assets/interfaces/trip';
import { TripId } from 'src/assets/types/tripId';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-trip-details-ratings',
  templateUrl: './trip-details-ratings.component.html',
  styleUrls: ['./trip-details-ratings.component.css']
})
export class TripDetailsRatingsComponent {
  @Input() tripId?: TripId;
  tripObs?: Observable<Trip | null>

  constructor (public fbData: FbDatabaseService) {}

  ngOnInit(): void {
    if (this.tripId != undefined) {
      this.tripObs = this.fbData.getTrip$ById(this.tripId);
    }
    
  }
}
