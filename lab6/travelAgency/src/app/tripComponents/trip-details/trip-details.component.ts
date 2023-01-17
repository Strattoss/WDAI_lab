import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket.service';
import { TripsDataService } from 'src/app/trips-data.service';
import { ImgInfo } from 'src/assets/interfaces/imgInfo';
import { Trip } from 'src/assets/interfaces/trip';
import { Comment } from 'src/assets/interfaces/comment';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripId?: number;
  trip?: Trip | null;

  /* img galery info */
  expandedImgInfo?: ImgInfo;
  showExpandedImg = false;

  numOfReservations = 0;

  model: Comment = { nick: "", tripTitle: "", content: "" };
  errorMsgs: string[] = [];
  comments: Comment[] = []
  //comments: Comment[] = [{ nick: "abc", tripTitle: this.trip?.name, content: "Example of comment. zsertdxryrfctuughb rfctdgvui fcgvcybjihjnko ftyctgycvihboijnop tgigvihboijnop ycggicvybji vuigh" }];

  constructor(public basket: BasketService,
    private activatedRoute: ActivatedRoute,
    private tripsData: TripsDataService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let id = paramMap.get('tripId');
      if (id != null) {
        this.tripId = Number.parseInt(id);
        let trip$ = this.tripsData.getTrip$ById(this.tripId);
        
        trip$.subscribe(tr => {
          this.trip = tr;
          this.model.tripTitle = tr?.name;
          if (this.tripId != undefined) {
            this.numOfReservations = this.basket.getTripReservations(this.tripId);
          }
        }
        );

      }
    })
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
    }
    );


    return sum / n;
  }

  getAverageRatingDivisor() {
    return Math.round(this.getAverageRating()) - 1;
  }

  onSubmit() {
    this.errorMsgs = [];
    if (this.model.content.length < 50) {
      this.errorMsgs.push("Comment has to be at least 50 characters long! Current length: " + this.model.content.length)
      return;
    }
    if (this.model.content.length > 500) {
      this.errorMsgs.push("Comment cannot exceed 500 characters in length! Current length: " + this.model.content.length)
      return;
    }
    this.comments.push(this.model);
  }

}
