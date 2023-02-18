import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Review } from 'src/assets/interfaces/review';
import { Roles } from 'src/assets/interfaces/roles';
import { TripId } from 'src/assets/types/tripId';
import { UserId } from 'src/assets/types/userId';
import { FbAuthService } from '../services/fb-auth.service';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-trip-details-review',
  templateUrl: './trip-details-review.component.html',
  styleUrls: ['./trip-details-review.component.css']
})
export class TripDetailsReviewComponent implements OnInit {
  @Input() tripId?: TripId;
  userReview: Review | null = null;
  userId?: UserId;
  boughtThisTrip: boolean = false;
  userRoles: Roles | null = null;
  tripRealised: boolean = false;

  reviewForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
    rating: [-1, [Validators.required, Validators.min(0), Validators.max(5)]]
  })

  constructor(private fb: FormBuilder,
    private fbData: FbDatabaseService,
    private fbAuth: FbAuthService,
    private afa: AngularFireAuth) { }

    
  ngOnInit(): void {
    this.fbData.getCurrentUsersReview(this.tripId)?.subscribe(x => this.userReview = x);
    this.afa.authState.subscribe(x => this.userId = x?.uid);
    this.fbData.getCurrentUserPurchases$().subscribe(x => {
      this.boughtThisTrip = (x.findIndex(y => y.tripId == this.tripId) != -1);
    });
    this.fbAuth.getCurrentUserRoles$().subscribe(x => this.userRoles = x);
    this.fbData.getCurrentUserPurchases$().pipe(map(x => {
      return x.filter(y => y.tripId == this.tripId).find(y => {return new Date(y.endDate).valueOf() < new Date().valueOf()})
    })).subscribe(x => {
      this.tripRealised = (x == undefined) ? false : true;
    });
  }

  getMessage(): string | null {
    if (!this.boughtThisTrip) { return "You cannot leave a review, because you haven't bought this trip"; }
    if (!this.tripRealised) { return "Trip hasn't taken place yet. You have to wait until the trip ends to leave a review" }
    if (this.userRoles?.banned) { return "Your account has been banned, so you cannot leave reviews! If you have questions, contact with an administrator"; }
    return null;
  }

  onSubmit() {
    if (!this.reviewForm.value.content?.length || !this.tripId) { return; }
    this.fbData.addReviewForTrip(this.tripId, this.reviewForm.value.rating!, this.reviewForm.value.content);
    this.reviewForm.reset();
  }

  ratingChanged(newRating: number) {
    this.reviewForm.patchValue({ rating: newRating })
  }


}
