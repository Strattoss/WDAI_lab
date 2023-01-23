import { Injectable } from '@angular/core';
import { Trip } from 'src/assets/interfaces/trip';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, Subscription } from 'rxjs';
import { TripId } from 'src/assets/types/tripId';
import { TripHistory } from 'src/assets/interfaces/tripHistory';
import { UserData } from 'src/assets/interfaces/userData';
import { Review } from 'src/assets/interfaces/review';
import { FbAuthService } from './fb-auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FbDatabaseService {

  tripsAndIds?: [Trip, TripId][] = [];
  currentUser: firebase.default.User | null = null;
  currentUserData: UserData | null = null;

  constructor(private db: AngularFireDatabase, private fbAuth: FbAuthService, private afa: AngularFireAuth) {
    this.getTripsAndIds$().subscribe(x => this.tripsAndIds = x);
    this.afa.authState.subscribe(x => this.currentUser = x);
    this.fbAuth.getCurrentUserData$().subscribe(x => this.currentUserData = x);
  }

  getTrips$(): Observable<Trip[]> {
    return this.db.list('trips').valueChanges().pipe(map(obj => obj as Trip[]));
  }

  getTripsAndIds$(): Observable<[Trip, TripId][]> {
    let a = this.db.list('trips').snapshotChanges().pipe(
      map(x => x.map(y => [y.payload.val(), y.key ? y.key : null] as [Trip, TripId | null]).filter(z => z[1] != null) as [Trip, TripId][]));
    return a as Observable<[Trip, TripId][]>;
  }

  getTrip$ById(id: TripId): Observable<Trip | null> {
    return this.db.object<Trip>('trips/' + id).valueChanges();
  }

  addTrip(newTrip: Trip) {
    let tripAlreadyExists = this.tripsAndIds?.find(t => t[0].name == newTrip.name);
    if (tripAlreadyExists != undefined) {
      throw new Error("Trip with this title already exists!");
    }
    else {
      this.db.list('trips').push(newTrip);
    }
  }

  deleteTrip(id: TripId) {
    this.db.object('trips/' + id).remove();
  }
  
  getTripsHistories$() {
    return this.db.list<TripHistory>('/tripHistory').valueChanges().pipe(map(x => x.filter(y => y.userId == this.currentUser?.uid)))
  }

  changeNumOfAvailableTickets(tripId: TripId, delta: number) {
    return this.db.object<Trip>('/trips/' + tripId + '/freeSeats').query.ref.transaction(freeSeats => {
      if (freeSeats < delta) { return; }
      else { return freeSeats - delta }
    })
  }

  addTripHistory(tripId: TripId, numOfTickets: number) {
    this.changeNumOfAvailableTickets(tripId, numOfTickets).then(x => {
      if (x.committed && this.currentUser?.uid) {
        this.db.list('/tripHistory/').push({
          tripId: tripId,
          userId: this.currentUser?.uid,
          tickets: numOfTickets,
          date: new Date().toISOString()
        })
      }
    })
  }

  getReviewsForTrip$(tripId: TripId) {
    return this.db.list<Review>('/reviews/').valueChanges().pipe(map(x => x.filter(y => y.tripId == tripId)));
  }

  addReviewForTrip(tripId: TripId, rating: number, content: string) {
    if (this.currentUserData?.roles.banned) {
      window.alert("You cannot write reviews because your account has been banned! Contact with an administrator")
      return;
    }
    if (!this.currentUser || !this.currentUserData) { return; }
    let newReview: Review = {
      tripId: tripId,
      nick: this.currentUserData?.firstName + "" + this.currentUserData?.lastName,
      userId: this.currentUser?.uid,
      rating: rating,
      content: content,
      date: new Date().toISOString()
    }
    this.db.list('/reviews/').push(newReview).then(x => {
      if (x) {
        this.db.object<Trip>('/trips/' + tripId + '/ratings/' + tripId).query.ref.transaction(rating => rating + 1)
      }
    })
  }
}
