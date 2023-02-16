import { Component } from '@angular/core';
import { CountriesDataService } from 'src/app/services/countries-data.service';
import { Trip } from 'src/assets/interfaces/trip';
import { FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ImgInfo } from 'src/assets/interfaces/imgInfo';
import { FbDatabaseService } from '../services/fb-database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripId } from 'src/assets/types/tripId';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css', '../../assets/styles/form.css']
})
export class TripFormComponent {
  countries?: string[];

  tripId?: TripId;

  tripForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[ -\uFFFF\x0A\x0D\x09]*')]],
    destination: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    unitPrice: ['', Validators.required],
    freeSeats: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    description: ['',  [Validators.required, Validators.pattern('[ -\uFFFF\x0A\x0D\x09]*')]],
    imgs: this.fb.array([])
  })

  imgsFormArray = this.tripForm.get('imgs') as FormArray;

  constructor(private countriesData: CountriesDataService,
    private fbData: FbDatabaseService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.addImgForm();

    this.countriesData.getCountries().subscribe(res => this.countries = res);

    this.activatedRoute.paramMap.subscribe(paramMap => {
      let tripId = paramMap.get('tripId');
      
      if (tripId != null) {
        this.tripId = tripId;
        let trip$ = this.fbData.getTrip$ById(tripId);

        trip$.subscribe(tr => {
          this.fillTripForm(tr);
        })
      }
    });
  }

  addImgForm() {
    const imgForm = this.fb.group({
      alt: ['', Validators.required],
      srcThumbnail: ['', [Validators.required, Validators.pattern('https?:\/\/[a-zA-Z0-9;,\/?:@%&=+$_.!~*\'()#\\-]*')]],
        srcFull: ['', [Validators.required, Validators.pattern('https?:\/\/[a-zA-Z0-9;,\/?:@%&=+$_.!~*\'()#\\-]*')]],
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

  fillTripForm(trip: Trip | null) {
    if (trip == null) {
      this.tripForm.reset();
      return;
    }

    let tmpTrip = {
      description: trip.description,
      destination: trip.destination,
      endDate: trip.endDate,
      freeSeats: trip.freeSeats.toString(),
      name: trip.name,
      startDate: trip.startDate,
      unitPrice: trip.unitPrice.toString(),
      imgs: trip.imgs
    };

    while (this.imgsFormArray.length < trip.imgs.length) {
      this.addImgForm();
    }

    this.tripForm.setValue(tmpTrip);
  }

  onSubmit() {
    if (this.tripId == undefined) {
      return;
    }

    if (!this.tripForm.value.startDate) {
      alert("You need to give correct start date!")
      return;
    }

    if (!this.tripForm.value.endDate) {
      alert("You need to give correct end date!")
      return;
    }

    if (this.tripForm.value.startDate >= this.tripForm.value.endDate) {
      alert("Trip end date has to be after trip start date!")
      return;
    }

    let imgsInfo: ImgInfo[] = []

    for (let i=0; i < this.imgsFormArray.length; i++) {
      let imgFormValues = this.imgsFormArray.at(i).value;
      imgsInfo.push({alt: imgFormValues.alt, srcThumbnail: imgFormValues.srcThumbnail, srcFull: imgFormValues.srcFull, title: imgFormValues.title})
    }

    // form attributes surely aren't null/undefined, because we use validators
    let newTrip: Trip = {
      name: this.tripForm.value.name!,
      destination: this.tripForm.value.destination!,
      startDate: this.tripForm.value.startDate,
      endDate: this.tripForm.value.endDate,
      unitPrice: Number.parseFloat(this.tripForm.value.unitPrice!),
      freeSeats: Number.parseInt(this.tripForm.value.freeSeats!),
      description: this.tripForm.value.description!,
      imgs: imgsInfo,
      ratings: [0, 0, 0, 0, 0]
    }

    this.tripForm.disable();

    if (this.tripId == "create-new-trip") { this.fbData.addTrip(newTrip).then(x => {
      alert("trip created");
      this.location.back();
    })}
    else { this.fbData.alterTrip(newTrip, this.tripId).then(x => {
      alert("trip altered");
      this.location.back();
    })}
    
  }
}
