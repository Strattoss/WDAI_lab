import { Component } from '@angular/core';
import { CountriesDataService } from 'src/app/services/countries-data.service';
import { Trip } from 'src/assets/interfaces/trip';
import { FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ImgInfo } from 'src/assets/interfaces/imgInfo';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css', '../../assets/styles/form.css']
})
export class TripFormComponent {
  countries?: string[];

  tripForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[ -\uFFFF\x0A\x0D\x09]*')]],
    destination: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    unitPrice: ['', Validators.required],
    freeSeats: ['', Validators.required],
    description: ['',  [Validators.required, Validators.pattern('[ -\uFFFF\x0A\x0D\x09]*')]],
    imgs: this.fb.array([
      this.fb.group({
        alt: ['', Validators.required],
        srcThumbnail: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        srcFull: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        title: ['', Validators.required]
      })
    ])
  })

  imgsFormArray = this.tripForm.get('imgs') as FormArray;

  constructor(private countriesData: CountriesDataService,
    private fbData: FbDatabaseService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.countriesData.getCountries().subscribe(res => this.countries = res);
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
      startDate: new Date(this.tripForm.value.startDate),
      endDate: new Date(this.tripForm.value.endDate),
      unitPrice: Number.parseFloat(this.tripForm.value.unitPrice!),
      freeSeats: Number.parseInt(this.tripForm.value.freeSeats!),
      description: this.tripForm.value.description!,
      imgs: imgsInfo,
      ratings: [0, 0, 0, 0, 0]
    }
    this.fbData.addTrip(newTrip);
    this.tripForm.reset();
  }
}
