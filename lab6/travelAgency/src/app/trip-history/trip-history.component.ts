import { Component } from '@angular/core';
import { TripHistory } from 'src/assets/interfaces/tripHistory';
import { FbAuthService } from '../services/fb-auth.service';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent {
  tripHistories: TripHistory[] = [];

  constructor (public fbAuth: FbAuthService, public fbData: FbDatabaseService) {
    fbData.getTripsHistories$().subscribe(x => {
      this.tripHistories = x;
    })
  }

}
