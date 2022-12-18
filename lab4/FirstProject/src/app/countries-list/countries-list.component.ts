import { Component } from '@angular/core';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent {
  countries: string[] = ["Argentina", "China", "Poland", "Zimbabwe"];
}
