import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FbAuthService } from '../services/fb-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private fbAuth: FbAuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.fbAuth.getCurrentUserRules$().pipe(map(x => {
      if (x?.client === true) {
        return true;
      }
      else {
        this.router.navigate(['home']);
        return false;
      }
    }));
  }
  
}
