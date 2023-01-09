import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsDataService } from 'src/app/trips-data.service';
import { TripsToDistinguishService } from '../trips-to-distinguish.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit{
  tripsAndIds?: [Trip,number][];

  constructor(public tripsDataService: TripsDataService, public tripsToDistinguish: TripsToDistinguishService) { }

  ngOnInit() {
    this.tripsDataService.getTripsAndIdsObservable().subscribe(x => {
      this.tripsAndIds = [];
      x.forEach(y => {
        if (y.key == null || y.payload.val() == null) { return };
        this.tripsAndIds?.push([y.payload.val() as Trip, Number.parseInt(y.key)]);
      });
    }
    );;
    let a = this.tripsAndIds?.map(x => x[0]);
    /*this.tripsDataService.getTripsObservable().subscribe({
      next: v => this.trips = v,
      error: e => this.trips = new Array<Trip>()
    });*/
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tripsToDistinguish.updateGreenRedBorders();
    }, 0)
  }

  getTrips() {
    let tmp = this.tripsAndIds?.map(x => x[0]);
    return tmp != undefined ? tmp : [] ;
  }

  getNthTripId(i: number) {
    if (this.tripsAndIds == undefined) {return;}
    return this.tripsAndIds[i][1];
  }

}
