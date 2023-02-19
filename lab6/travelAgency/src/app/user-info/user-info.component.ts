import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserData } from 'src/assets/interfaces/userData';
import { FbAuthService } from '../services/fb-auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  userData: UserData | null = null;
  user: firebase.default.User | null = null;

  constructor (private fbAuth: FbAuthService, private afa: AngularFireAuth) {
    this.fbAuth.getCurrentUserData$().subscribe(x => this.userData = x);
    this.afa.authState.subscribe(x => this.user = x);
    
    
  }

}
