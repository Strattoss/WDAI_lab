import { Component, OnInit } from '@angular/core';
import { CountriesDataService } from 'src/app/countries-data.service';
import { Trip } from 'src/app/trip';
import { TripsDataService } from 'src/app/trips-data.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {

  countries?: string[];
  model: Trip = { name: "Tittle of The Trip", destination: "Poland", startDate: new Date("2026-06-25"), endDate: new Date("2026-06-30"), unitPrice: 849.99, freeSeats: 15, description: "Description of the trip", imgPath: "../assets/img/tripImgs/Prague.jpg" };

  constructor(public countriesData: CountriesDataService, public tripsData: TripsDataService) { }

  ngOnInit() {
    this.countriesData.getCountries().then(res => this.countries = res, () => this.countries = []);
  }

  onSubmit() {

    let newTrip: Trip = {
      name: this.model.name,
      destination: this.model.destination,
      startDate: this.model.startDate,
      endDate: this.model.endDate,
      unitPrice: this.model.unitPrice,
      freeSeats: this.model.freeSeats,
      description: this.model.description,
      imgPath: this.model.imgPath,
    }
    this.tripsData.addTrip(newTrip);
  }
}
