import { Injectable } from '@angular/core';
import { Countries } from '../assets/data/countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {

  constructor() { }

  getCountries() {
    return Promise.resolve(Countries);
  }
}
