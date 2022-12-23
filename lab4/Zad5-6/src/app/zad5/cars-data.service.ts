import { Injectable } from '@angular/core';
import { Cars } from './mockup-cars-data';

@Injectable({
  providedIn: 'root'
})
export class CarsDataService {

  constructor() { }

  getCars() {
    return Promise.resolve(Cars);
  }

}
