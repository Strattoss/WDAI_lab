import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket.service';
import { TripsDataService } from 'src/app/trips-data.service';
import { ImgInfo } from 'src/assets/interfaces/imgInfo';
import { ImgUrl } from 'src/assets/interfaces/ImgUrl';
import { Trip } from 'src/assets/interfaces/trip';
import { Comment } from 'src/assets/interfaces/comment';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripId?: number;
  tripObs?: Observable<Trip>;
  trip?: Trip;

  /* img galery info */
  expandedImgInfo?: ImgInfo;
  expandedImgUrl?: string;
  showExpandedImg = false;

  numOfReservations = 0;

  model: Comment = {nick: "", tripTitle: this.trip?.name, content: ""};
  errorMsgs: string[] = [];
  comments: Comment[] = [{nick: "abc", tripTitle: this.trip?.name, content: "Example of comment. zsertdxryrfctuughb rfctdgvui fcgvcybjihjnko ftyctgycvihboijnop tgigvihboijnop ycggicvybji vuigh"}];

  constructor(public basket: BasketService,
    private activatedRoute: ActivatedRoute,
    private tripsData: TripsDataService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let id = paramMap.get('tripId');
      if (id != null) {
        this.tripId = Number.parseInt(id);
        this.tripObs = this.tripsData.getTripById(this.tripId);
        this.tripObs.subscribe(v => {
          this.trip = v;
          this.model.tripTitle = this.trip.name;
          this.numOfReservations = this.basket.getNumOfReservations(this.trip);
        }
        );

      }
    })
  }

  expandImg(imgUrl: ImgUrl) {
    this.showExpandedImg = true;
    this.expandedImgInfo = this.getFullVerOfThumbnail(imgUrl);
    this.expandedImgUrl = this.expandedImgInfo?.imgs[1]?.src;
  }

  closeImg() {
    this.showExpandedImg = false;
  }

  getThumbnails() {
    const isImgUrl = (item: ImgUrl | undefined): item is ImgUrl => {
      return !!item
    }

    let a = this.trip?.imgsInfo.map(val => val.imgs[0]).filter(isImgUrl);

    return a == undefined ? new Array<ImgUrl>() : a;
  }

  getFullVerOfThumbnail(imgUrl: ImgUrl): ImgInfo | undefined {
    let b = this.trip?.imgsInfo.find(x => x.imgs.indexOf(imgUrl) != -1)

    if (b == undefined) { return undefined };

    return b;
  }

  ifYellow() {
    if (this.trip == undefined) {
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

    if (n > 0) {
      this.basket.addReservation(this.trip);
    } else {
      this.basket.removeReservation(this.trip);
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
