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
  hamburgerToggled = false;
  hamburgerEnabled = false;

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

    fbAuth.getCurrentUserRules$().subscribe( x => {
      this.currUserRoles = x;
  })
  }

  toggleHamburger() {
    this.hamburgerToggled = !this.hamburgerToggled;
  }

  route(path: string) {
    this.hamburgerToggled = false;
    this.router.navigate([path]);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 1100) {
      this.hamburgerEnabled = true;
    } else {
      this.hamburgerEnabled = false;
      this.hamburgerToggled = false;
    }
  }

  logOut() {
    this.fbAuth.logOutUser();
  }
}


