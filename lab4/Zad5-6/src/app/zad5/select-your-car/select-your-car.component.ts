import { Component, OnInit } from '@angular/core';
import { CarsDataService } from '../cars-data.service';
import { Car } from '../car';

@Component({
  selector: 'app-select-your-car',
  templateUrl: './select-your-car.component.html',
  styleUrls: ['./select-your-car.component.css']
})
export class SelectYourCarComponent implements OnInit {
  cars?: Car[];
  selectedMake?: string;
  selectedModel?: string
  selectedColor?: string;

  showMakes = false;
  showModels = false;
  showColors = false;
  showFullCar = false;

  constructor(private carsData: CarsDataService) {}
  
  ngOnInit(): void {
    this.carsData.getCars().then(res => {this.cars = res; this.showMakes = true;});
  }

  getMakes() {
    return this.cars?.map(
      car => car.make).filter(
      (value, index, self) => self.indexOf(value) === index).sort();
  }

  getModels() {
    return this.cars?.filter(
      car => car.make == this.selectedMake).map(
      car => car.model).filter(
      (value, index, self) => self.indexOf(value) === index).sort();
  }

  getColors() {
    return this.cars?.filter(
      car => car.make == this.selectedMake && car.model == this.selectedModel).flatMap(
      car => car.colors);
  }

  makeChosen() {
    this.showModels = true
    this.showColors = false
    this.showFullCar = false
  }

  modelChosen() {
    this.showColors = true
    this.showFullCar = false
  }

  colorChosen() {
    this.showFullCar = true;
    console.log(this.selectedColor);
  }

}
