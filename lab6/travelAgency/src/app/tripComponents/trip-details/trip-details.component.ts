import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { FbAuthService } from 'src/app/services/fb-auth.service';
import { FbDatabaseService } from 'src/app/services/fb-database.service';
import { ImgInfo } from 'src/assets/interfaces/imgInfo';
import { Review } from 'src/assets/interfaces/review';
import { Trip } from 'src/assets/interfaces/trip';
import { TripId } from 'src/assets/types/tripId';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripId?: TripId;
  trip?: Trip | null;

  userId?: string;

  /* img galery info */
  expandedImgInfo?: ImgInfo;
  showExpandedImg = false;

  numOfReservations = 0;

  reviewForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
    rating: [-1, [Validators.required, Validators.min(0), Validators.max(5)]]
  })

  reviews: Review[] = []

  constructor(public basket: BasketService,
    private activatedRoute: ActivatedRoute,
    private fbData: FbDatabaseService,
    private fb: FormBuilder,
    private fbAuth: FbAuthService,
    private afa: AngularFireAuth) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let id = paramMap.get('tripId');
      if (id != null) {
        this.tripId = id;
        let trip$ = this.fbData.getTrip$ById(this.tripId);
        
        trip$.subscribe(tr => {
          this.trip = tr;
          if (this.tripId != undefined) {
            this.numOfReservations = this.basket.getTripReservations(this.tripId);
          }
        })

        this.fbData.getReviewsForTrip$(this.tripId).subscribe(x => {
          this.reviews = x;
        })
      }
    });

    this.afa.authState.subscribe(x => this.userId = x?.uid)
  }

  expandImg(imgInfo: ImgInfo) {
    this.expandedImgInfo = imgInfo;
    this.showExpandedImg = true;
  }

  closeImg() {
    this.showExpandedImg = false;
  }

  getThumbnails() {
    let a = this.trip?.imgs.map(val => val.srcThumbnail);
    return a != undefined ? a : new Array<string>();
  }

  ifYellow() {
    if (this.trip == undefined || this.trip == null) {
      return false;
    }
    return this.trip.freeSeats - this.numOfReservations <= 10 && this.trip.freeSeats - this.numOfReservations >= 4;
  }

  ifRed() {
    if (this.trip == undefined) {
      return false;
    }
    return !this.ifYellow() && this.trip.freeSeats - this.numOfReservations <= 3;
  }

  ifFreeSeatsAvailible() {
    if (this.trip == undefined) {
      return false;
    }
    return this.trip.freeSeats - this.numOfReservations > 0;
  }

  deltaReservation(n: number) {
    if (!this.trip ||
      this.numOfReservations + n < 0 ||
      this.numOfReservations + n > this.trip.freeSeats) {
      return;
    }
    this.numOfReservations += n;

    if ( this.tripId == undefined) {return;}
    if (n > 0) {
      this.basket.addReservation(this.tripId);
    } else {
      this.basket.removeReservation(this.tripId);
    }
  }

  getAverageRating() {
    let sum = 0;
    let n = 0;
    this.trip?.ratings.forEach((val, i) => {
      sum += val * (i + 1);
      n += val;
    });

    return sum / n - 1;
  }

  getAverageRatingDivisor() {
    return Math.round(this.getAverageRating());
  }

  onSubmit() {
    if (!this.reviewForm.value.content?.length || !this.tripId || !this.reviewForm.value.rating) { return; }
    
    this.fbData.addReviewForTrip(this.tripId, this.reviewForm.value.rating, this.reviewForm.value.content);

    this.reviewForm.reset();
  }

  getCurrentUserReviewedTrip() {
    if (!this.userId) { undefined; }
    return this.reviews.find(x => x.userId == this.userId);
  }

  ratingChanged(newRating: number) {
    this.reviewForm.patchValue({ rating: newRating })
  }

  boughtThisTrip() {
    return false;
  }

}
