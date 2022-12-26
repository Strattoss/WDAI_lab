import { Component } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent {
  ratingDivisor = -1;
  ratingDivisorMovable = true;

  setRatingDivisor(n: number) {
    if (this.ratingDivisorMovable) {
      this.ratingDivisor = n;
    }
  }

  clickedStar(starNum: number) {
    if (this.ratingDivisorMovable) {
      this.ratingDivisor = starNum;
      this.ratingDivisorMovable = false;
    }
  }
  
}
