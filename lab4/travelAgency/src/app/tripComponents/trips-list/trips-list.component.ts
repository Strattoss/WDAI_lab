import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Trip } from 'src/app/trip';
import { TripsDataService } from 'src/app/trips-data.service';
import { TripsToDistinguishService } from '../trips-to-distinguish.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit{
  trips?: Trip[];

  constructor(public tripsDataService: TripsDataService, public tripsToDistinguish: TripsToDistinguishService) { }

  ngOnInit() {
    this.tripsDataService.getTrips().then(res => this.trips = res, err => this.trips = undefined);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tripsToDistinguish.updateGreenRedBorders();
    }, 0)
  }

}
