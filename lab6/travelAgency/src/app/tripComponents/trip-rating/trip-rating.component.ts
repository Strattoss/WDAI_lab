import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent {
  @Input() ratingDivisor = -1;
  @Input() ratingDivisorMovable = false;
  @Input() ratingNum?: number;
  @Output() numOfStars = new EventEmitter<number>();

  setRatingDivisor(n: number) {
    if (this.ratingDivisorMovable) {
      this.ratingDivisor = n;
    }
  }

  clickedStar(starNum: number) {
    if (this.ratingDivisorMovable) {
      this.ratingDivisor = starNum;
      this.ratingNum = starNum;
      this.emitNumOfStars(this.ratingDivisor);
    }
  }

  emitNumOfStars(value: number) {
    this.numOfStars.emit(value);
  }

  isNaN(n: number) {
    return isNaN(n);
  }
  
}
