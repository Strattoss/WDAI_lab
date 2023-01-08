import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {

  constructor(private db:AngularFireDatabase) {}

  getCountries() {
    return this.db.object('countries').valueChanges().pipe(map(val => val as string[]))
  }
}
