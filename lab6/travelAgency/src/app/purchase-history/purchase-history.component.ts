import { Component } from '@angular/core';
import { Purchase } from 'src/assets/interfaces/purchase';
import { FbAuthService } from '../services/fb-auth.service';
import { FbDatabaseService } from '../services/fb-database.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class TripHistoryComponent {
  purchases: Purchase[] = [];

  constructor (public fbAuth: FbAuthService, public fbData: FbDatabaseService) {
    fbData.getCurrentUserPurchases$().subscribe(x => {
      this.purchases = x.sort((a: Purchase, b: Purchase) => Date.parse(b.purchaseDate) - Date.parse(a.purchaseDate));
    })
  }

  sortedTrips() {
    let pastTrips = this.purchases.filter(x => new Date(x.endDate).valueOf() < new Date().valueOf());
    let currentTrips = this.purchases.filter(x => new Date(x.startDate).valueOf() < new Date().valueOf() && new Date().valueOf() < new Date(x.endDate).valueOf());
    let futureTrips = this.purchases.filter(x => new Date().valueOf() < new Date(x.startDate).valueOf());
  
    let sortByDate = (a: Purchase, b: Purchase) => new Date(b.endDate).valueOf() - new Date(a.startDate).valueOf();

    return futureTrips.sort(sortByDate).concat(currentTrips.sort(sortByDate), pastTrips.sort(sortByDate));
  }

  

}
