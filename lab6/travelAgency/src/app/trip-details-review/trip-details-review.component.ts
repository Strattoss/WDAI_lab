import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAction } from '@angular/fire/compat/database';
import { FormBuilder, Validators } from '@angular/forms';
import { Review } from 'src/assets/interfaces/review';
import { Roles } from 'src/assets/interfaces/roles';
import { TripHistory } from 'src/assets/interfaces/tripHistory';
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
  ifBoughtThisTrip: boolean = false;
  userRoles: Roles | null = null;

  constructor(private fb: FormBuilder,
    private fbData: FbDatabaseService,
    private fbAuth: FbAuthService,
    private afa: AngularFireAuth) { }

  ngOnInit(): void {
    this.fbData.getCurrentUsersReview(this.tripId)?.subscribe(x => this.userReview = x);
    this.afa.authState.subscribe(x => this.userId = x?.uid);
    this.fbData.getCurrentUserTripHistory$().subscribe(x => {
      this.ifBoughtThisTrip = (x.findIndex(y => y.tripId == this.tripId) != -1);
    });
    this.fbAuth.getCurrentUserRoles$().subscribe(x => this.userRoles = x);
  }

  reviewForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
    rating: [-1, [Validators.required, Validators.min(0), Validators.max(5)]]
  })

  onSubmit() {
    if (!this.reviewForm.value.content?.length || !this.tripId) { return; }
    this.fbData.addReviewForTrip(this.tripId, this.reviewForm.value.rating!, this.reviewForm.value.content);
    this.reviewForm.reset();
  }

  ratingChanged(newRating: number) {
    this.reviewForm.patchValue({ rating: newRating })
  }


}
