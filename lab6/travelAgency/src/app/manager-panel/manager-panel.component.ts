import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/assets/interfaces/trip';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.css']
})
export class ManagerPanelComponent {
  tripAndIds: [Trip, string][] = [];

  constructor (private fbdb: FbDatabaseService) {
    fbdb.getTripsAndIds$().subscribe(x => this.tripAndIds = x.sort((a:[Trip, string], b:[Trip, string]) => {
      return a[0].name.localeCompare(b[0].name);
    }));
  }
  
  

}
