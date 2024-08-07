import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { FbAuthService } from 'src/app/services/fb-auth.service';
import { FbDatabaseService } from 'src/app/services/fb-database.service';
import { Review } from 'src/assets/interfaces/review';
import { Roles } from 'src/assets/interfaces/roles';
import { Trip } from 'src/assets/interfaces/trip';
import { Purchase } from 'src/assets/interfaces/purchase';
import { TripId } from 'src/assets/types/tripId';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripId?: TripId;
  trip?: Trip | null;

  userId?: string;
  userRoles: Roles | null = null;
  userReview: Review | null = null;

  numOfReservations = 0;

  tripHistory: Purchase[] = [];

  reviews: Review[] = []

  constructor(public basket: BasketService,
    private activatedRoute: ActivatedRoute,
    private fbData: FbDatabaseService,
    private fbAuth: FbAuthService,
    private afa: AngularFireAuth,
    private location: Location) { }

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

    this.afa.authState.subscribe(x => this.userId = x?.uid);

    this.fbData.getCurrentUserPurchases$().subscribe(x => this.tripHistory = x);

    this.fbAuth.getCurrentUserRoles$().subscribe(x => this.userRoles = x);
  }

  getAverageRating() {
    let sum = 0;
    let n = 0;
    this.trip?.ratings.forEach((val, i) => {
      sum += val * (i + 1);
      n += val;
    });

    return sum / n;
  }

  getAverageRatingDivisor() {
    return Math.round(this.getAverageRating() - 1);
  }

  ifBoughtThisTrip() {
    return this.tripHistory.findIndex(x => x.tripId == this.tripId) != -1;
  }

  navigateBack() {
    this.location.back();
  }

}
