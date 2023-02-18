import { Component, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { Roles } from 'src/assets/interfaces/roles';
import { UserData } from 'src/assets/interfaces/userData';
import { FbAuthService } from '../services/fb-auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  burgerEnabled = false; // if nav-bar is in its toggle-able form (not full form)
  burgerToggled = false; // if burger menu is visible for user

  currUser: firebase.default.User | null = null;
  currUserData: UserData | null = null;
  currUserRoles: Roles | null = null;

  constructor (private router: Router, public basket:BasketService, public fbAuth: FbAuthService, private afa: AngularFireAuth) {
    this.onResize();
    fbAuth.getCurrentUserData$().subscribe(x => {
      this.currUserData = x;
    })

    afa.authState.subscribe(x => {
      this.currUser = x;
    })

    fbAuth.getCurrentUserRoles$().subscribe( x => {
      this.currUserRoles = x;
  })
  }

  toggleburger() {
    this.burgerToggled = !this.burgerToggled;
  }

  route(path: string) {
    this.burgerToggled = false;
    this.router.navigate([path]);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 800) {
      this.burgerEnabled = true;
    } else {
      this.burgerEnabled = false;
      this.burgerToggled = false;
    }
  }

  logOut() {
    this.fbAuth.logOutUser();
  }
}


