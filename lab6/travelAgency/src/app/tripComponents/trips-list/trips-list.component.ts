import { Component, OnInit} from '@angular/core';
import { FbDatabaseService } from 'src/app/services/fb-database.service';
import { Trip } from 'src/assets/interfaces/trip';
import { TripId } from 'src/assets/interfaces/tripId';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit{
  tripsAndIds?: [Trip, TripId][];

  constructor(public fbData: FbDatabaseService) { }

  ngOnInit() {
    this.fbData.getTripsAndIds$().subscribe(x => this.tripsAndIds = x);
    
    
  }

  getTrips() {
    let tmp = this.tripsAndIds?.map(x => x[0]);
    return tmp != undefined ? tmp : [] ;
  }

  getNthTripId(i: number) {
    if (this.tripsAndIds == undefined) {return;}
    return this.tripsAndIds[i][1];
  }

  getTripIds() {
    return this.tripsAndIds?.map(x => x[1]);
  }

}
