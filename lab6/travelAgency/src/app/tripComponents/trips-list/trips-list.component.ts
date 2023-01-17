import { Component, OnInit} from '@angular/core';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsDataService } from 'src/app/trips-data.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit{
  tripsAndIds?: [Trip,number][];

  constructor(public tripsDataService: TripsDataService) { }

  ngOnInit() {
    this.tripsDataService.getTripsAndIds$().subscribe(x => this.tripsAndIds = x);
    let a = this.tripsAndIds?.map(x => x[0]);
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
