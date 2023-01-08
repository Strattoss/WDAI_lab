import { Component, OnInit } from '@angular/core';
import { CountriesDataService } from 'src/app/countries-data.service';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsDataService } from 'src/app/trips-data.service';
import { TripsToDistinguishService } from 'src/app/tripComponents/trips-to-distinguish.service';
import { ImgInfo } from 'src/assets/interfaces/imgInfo';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {

  countries?: string[];
  model = { name: "Tittle of The Trip", destination: "Poland", startDate: new Date(), endDate: new Date(), unitPrice: 849.99, freeSeats: 15, description: "Description of the trip", imgsInfo: "../assets/img/tripImgs/Prague.jpg" };

  constructor(public countriesData: CountriesDataService, public tripsData: TripsDataService, public tripsToDistinguish: TripsToDistinguishService) { }

  ngOnInit() {
    this.countriesData.getCountries().subscribe(res => this.countries = res);
    //this.countriesData.getCountries().then(res => this.countries = res, () => this.countries = []);
  }

  onSubmit() {
    if (this.model.startDate >= this.model.endDate) {
      alert("Trip end date has to be after trip start date!")
      return;
    }
    let newTrip: Trip = {
      name: this.model.name,
      destination: this.model.destination,
      startDate: this.model.startDate,
      endDate: this.model.endDate,
      unitPrice: this.model.unitPrice,
      freeSeats: this.model.freeSeats,
      description: this.model.description,
      imgsInfo: JSON.parse(this.model.imgsInfo) as ImgInfo[],
      ratings: [0, 0, 0, 0, 0]
    }
    this.tripsData.addTrip(newTrip);
    setTimeout(() => {
      this.tripsToDistinguish.updateGreenRedBorders();
    }, 0)
    
  }
}
