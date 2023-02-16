import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FbAuthService } from '../services/fb-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripDetailsGuard implements CanActivate {

  constructor(private fbAuth: FbAuthService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.fbAuth.getCurrentUserRoles$().pipe(map(x => {
        if (x?.client === true || x?.manager === true) {
          return true;
        }
        else if (x === null) {
          this.router.navigate(['log-in']);
          return true;
        }
        else {
          this.router.navigate(['home']);
          return false;
        }
      }));
  }
  
}
