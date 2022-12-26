import { Injectable } from '@angular/core';
import { Countries } from './countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {

  constructor() { }

  getCountries() {
    return Promise.resolve(Countries);
  }
}
