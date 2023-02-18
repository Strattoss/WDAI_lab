import { Component, Input, OnInit } from '@angular/core';
import { Purchase } from 'src/assets/interfaces/purchase';
import { Trip } from 'src/assets/interfaces/trip';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-purchase-history-tile',
  templateUrl: './purchase-history-tile.component.html',
  styleUrls: ['./purchase-history-tile.component.css']
})
export class PurchaseHistoryTileComponent implements OnInit {
  @Input() purchase?: Purchase;
  trip: Trip | null = null;

  constructor(private fbData: FbDatabaseService) { }

  ngOnInit(): void {
    if (this.purchase) {
      this.fbData.getTrip$ById(this.purchase?.tripId).subscribe(x => this.trip = x)
    }
  }

  // get strip color for purchase based on time (if trip was in the past, is now or will be in the future)
  getPurchaseColor() {
    if (!this.purchase) { return; }

    // past
    if (Date.parse(this.purchase.endDate) < new Date().valueOf()) {
      return 'rgb(223, 42, 59)';
    }

    // present
    if (Date.parse(this.purchase.startDate) < new Date().valueOf() &&
      new Date().valueOf() < Date.parse(this.purchase.endDate)) {
      return 'rgb(80, 200, 120)';
    }

    // future
    else {
      return "rgb(36, 193, 255)";
    }
  }
}
