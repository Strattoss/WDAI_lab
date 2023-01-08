import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent {
  @Input() ratingDivisor = -1;
  @Input() ratingDivisorMovable = false;
  @Input() ratingNum?: number;

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

  isNaN(n: number) {
    return isNaN(n);
  }
  
}
