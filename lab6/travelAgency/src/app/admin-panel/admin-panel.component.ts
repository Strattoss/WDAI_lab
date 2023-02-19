import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/assets/interfaces/userData';
import { TripId } from 'src/assets/types/tripId';
import { UserId } from 'src/assets/types/userId';
import { FbAuthService } from '../services/fb-auth.service';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{

  users: [UserId, UserData][] = [];

  constructor(private fbAuth: FbAuthService, private fbData: FbDatabaseService) {}

  ngOnInit(): void {
    this.fbAuth.getAllUsersData().subscribe(x => {
      this.users = x;
    });
  }

  changeRole(user: [UserId, UserData], role: string, changeTo: boolean) {
    this.fbAuth.updateUserRole(user[0], role, changeTo);
  }
}
