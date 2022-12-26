import { Injectable } from '@angular/core';
import { Trips } from './mock-trips';

@Injectable({
  providedIn: 'root'
})
export class TripsDataService {

  constructor() { }

  getTrips() {
    return Promise.resolve(Trips);
  }
}
