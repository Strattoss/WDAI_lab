import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SignUpData } from 'src/assets/interfaces/signUpData';
import { UserData } from 'src/assets/interfaces/userData';
import { Roles } from 'src/assets/interfaces/roles';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserId } from 'src/assets/types/userId';

@Injectable({
  providedIn: 'root'
})
export class FbAuthService {

  persistenceSetting = "local";

  private currentUser: firebase.default.User | null = null
  private currentUserData: UserData | null = null;
  private currentUserData$ = new BehaviorSubject<UserData | null>(null);

  private currentUserRoles$ = new BehaviorSubject<Roles | null>(null);

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(x => {
      // current user changed
      this.currentUser = x;
      if (x?.uid == null) {
        this.currentUserData = null;
        this.currentUserData$.next(null);
        this.currentUserRoles$.next(null);
      }
      else {
        this.getUserData(x?.uid).subscribe(y => {
          this.currentUserData = y;
          this.currentUserData$.next(y);

          // get roles of current user
          if (y?.roles) {
            this.currentUserRoles$.next(y?.roles);
          }
          else {
            this.currentUserRoles$.next(null);
          }
          console.log(y?.roles);
          
        })
      }
      
    })
  }

  getCurrentUserData$() {
    return this.currentUserData$;
  }

  signUpUser(signUpData: SignUpData, password: string) {
    this.afAuth.createUserWithEmailAndPassword(signUpData.email, password)
      .then((result) => {
        console.log("Create new user");
        console.log(result);
        if (result.user == null) {
          window.alert("Couldn't create new user, error from Firebase");
          return;
        }
        this.createUser(signUpData, result.user).then(() => {
          this.logInUser(signUpData.email, password);
        })
      })
      .catch((error) => { window.alert(error.message); })
  }

  logInUser(email: string, password: string) {
    return this.afAuth.setPersistence(this.persistenceSetting).then(() => {
      this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
        console.log("User logged in: ");
        console.log(result);
        this.router.navigate(['home']);
      })
        .catch((error) => { window.alert(error.message); })
    })

  }

  logOutUser() {
    return this.afAuth.signOut().then(() => {
      console.log("User logged out");
      this.router.navigate(['log-in']);
    })
  }

  changePersistence(newPers: string) {
    if (['local', 'session', 'none'].includes(newPers)) {
      this.persistenceSetting = newPers;
    }
    else {
      throw new Error("Incorrect persistence setting");
    }
  }

  getCurrentUserRules$(): BehaviorSubject<Roles | null> {
    return this.currentUserRoles$;
  }

  // communication with Firebase database

  readonly newUserRoles: Roles = {
    client: true,
    manager: false,
    admin: false,
    banned: false
  }

  createUser(userData: SignUpData, user: firebase.default.User) {
    // Save new user data in database
    return this.db.object('/users/' + user.uid).set({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      roles: this.newUserRoles
    });
  }

  private getUserData(uid: string): Observable<UserData | null> {
    // Get data about user from firebase databse as observable
    return this.db.object<UserData>('/users/' + uid).valueChanges();
  }

  getAllUsersData(): Observable<[UserId, UserData][]> {
    return this.db.list('/users').snapshotChanges().pipe(map(x => x.map(y => [y.key, y.payload.val()] as [UserId, UserData])))
  }

  updateUserRole(userId: UserId, role: string, changeTo: boolean) {
    return this.db.object('/users/' + userId + '/roles/' + role).set(changeTo);
  }
}
