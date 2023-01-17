import { Component } from '@angular/core';
import { CountriesDataService } from 'src/app/countries-data.service';
import { Trip } from 'src/assets/interfaces/trip';
import { TripsDataService } from 'src/app/trips-data.service';
import { TripsToDistinguishService } from 'src/app/trips-to-distinguish.service';
import { FormArray, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {
  countries?: string[];

  tripForm = this.fb.group({
    name: ['', Validators.required],
    destination: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    unitPrice: ['', Validators.required],
    freeSeats: ['', Validators.required],
    description: ['', Validators.required],
    imgs: this.fb.array([
      this.fb.group({
        alt: ['', Validators.required],
        srcThumbnail: ['', Validators.required],
        srcFull: ['', Validators.required],
        title: ['', Validators.required]
      })
    ])
  })

  imgsFormArray = this.tripForm.get('imgs') as FormArray;

  constructor(public countriesData: CountriesDataService,
    public tripsData: TripsDataService,
    public tripsToDistinguish: TripsToDistinguishService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.countriesData.getCountries().subscribe(res => this.countries = res);
    //this.countriesData.getCountries().then(res => this.countries = res, () => this.countries = []);

    // fill in the form with initial values
    this.tripForm.value.name
  }

  addImgForm() {
    const imgForm = this.fb.group({
      alt: ['', Validators.required],
      srcThumbnail: ['', Validators.required],
      srcFull: ['', Validators.required],
      title: ['', Validators.required]
    });

    let imgsForm = this.tripForm.get('imgs') as FormArray

    imgsForm.push(imgForm);
  }

  deleteImgForm(id: number) {
    if (this.imgsFormArray.length > 1) {
      this.imgsFormArray.removeAt(id);
    }
  }

  onSubmit() {
    console.log("submit");

    /*if (this.model.startDate >= this.model.endDate) {
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
      imgs: JSON.parse(this.model.imgs),
      ratings: [0, 0, 0, 0, 0]
    }
    this.tripsData.addTrip(newTrip);*/
  }
}
