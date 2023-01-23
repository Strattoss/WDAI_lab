import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/assets/interfaces/userData';
import { FbAuthService } from '../services/fb-auth.service';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{
  selectedPersistence = this.fbAuth.persistenceSetting;

  users: [string, UserData][] = [];

  constructor(private fbAuth: FbAuthService, private fbData: FbDatabaseService) {}

  ngOnInit(): void {
    this.fbAuth.getAllUsersData().subscribe(x => {
      this.users = x;
      console.log(x[0]);
      
    });
  }

  chosenPersistence() {
    this.fbAuth.changePersistence(this.selectedPersistence);
  }
}
