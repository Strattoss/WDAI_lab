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
import { UserId } from 'src/assets/types/userId';

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

  getCurrentUserTripHistory$() {
    return this.db.list<TripHistory>('/tripHistory/' + this.currentUser?.uid).valueChanges();
  }

  changeNumOfAvailableTickets(tripId: TripId, delta: number) {
    return this.db.object<Trip>('/trips/' + tripId + '/freeSeats').query.ref.transaction(freeSeats => {
      if (freeSeats < delta) { return; }
      else { return freeSeats - delta }
    })
  }

  addTripHistory(tripId: TripId, numOfTickets: number) {
    if (!this.currentUser?.uid) { return; }

    let newTripHistory: TripHistory = {
      tripId: tripId,
      tickets: numOfTickets,
      date: new Date().toISOString()
    }

    this.db.list('/tripHistory/' + this.currentUser.uid).push(newTripHistory).then(x => {
      if (x) {
        this.changeNumOfAvailableTickets(tripId, numOfTickets);
      }
    });
  }

  getReviewsForTrip$(tripId: TripId) {
    return this.db.list<Review>('/reviews/' + tripId).valueChanges();
  }

  getCurrentUsersReview(tripId: TripId | undefined) {
    if (tripId === undefined) { return null; }
    if (!this.currentUser) { return null; }
    return this.db.object<Review>('/reviews/' + tripId + '/' + this.currentUser.uid).valueChanges();
  }

  addReviewForTrip(tripId: TripId, rating: number, content: string) {
    if (this.currentUserData?.roles.banned) {
      window.alert("You cannot write reviews because your account has been banned! Contact with an administrator")
      return;
    }
    if (!this.currentUser || !this.currentUserData) { return; }
    let newReview: Review = {
      nick: this.currentUserData?.firstName + " " + this.currentUserData?.lastName,
      rating: rating,
      content: content,
      date: new Date().toISOString()
    }
    this.db.object('/reviews/' + tripId + '/' + this.currentUser.uid).set(newReview).then(() => {
        this.db.object<Trip>('/trips/' + tripId + '/ratings/' + rating).query.ref.transaction(rating => rating + 1)
    })
    // update number of free tickets

  }
}

