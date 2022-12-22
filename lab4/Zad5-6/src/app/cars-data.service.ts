import { Injectable } from '@angular/core';
import { Car } from './car';
import { Cars } from './mockup-cars-data';

@Injectable({
  providedIn: 'root'
})
export class CarsDataService {

  constructor() { }

  getCars() {
    return Promise.resolve(Cars);
  }

  /*getCarsByMake(make: string): Car[] {
    this.getCars().then(data => {return data.filter(car => {car.make == make;})})
    return [];
  }

  getCarsByMakeAndModel(make: string, model: string): Car[] {
    this.getCars().then(data => {return data.filter(car => {car.make == make && car.model == model})})
    return [];
  }*/

}
