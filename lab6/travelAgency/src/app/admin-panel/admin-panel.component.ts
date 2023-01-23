import { Component } from '@angular/core';
import { FbAuthService } from '../services/fb-auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  selectedPersistence = this.fbAuth.persistenceSetting;

  constructor(private fbAuth: FbAuthService) {}

  chosenPersistence() {
    this.fbAuth.changePersistence(this.selectedPersistence);
  }
}
