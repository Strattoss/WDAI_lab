import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  hamburgerToggled = false;
  hamburgerEnabled = false;

  constructor (private router: Router, public basket:BasketService) {
    this.onResize();
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
}


