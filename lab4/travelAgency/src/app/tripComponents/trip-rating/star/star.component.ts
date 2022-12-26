import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent{
  @Input() ratingDivisor?: number;
  @Input() myNum?: number;
  @Output() clickedStarEmitter = new EventEmitter<number>();

  ifStarEmpty() {
    if (this.myNum == undefined || this. ratingDivisor == undefined) {
      console.log("Star error!")
      return;
    }
    
    return this.myNum > this.ratingDivisor;
  }

  clickedStar() {
    this.clickedStarEmitter.emit(this.myNum);
  }
}
