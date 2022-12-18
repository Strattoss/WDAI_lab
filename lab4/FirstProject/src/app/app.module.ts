import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { DropdownSelectComponent } from './dropdown-select/dropdown-select.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeMessageComponent,
    CountriesListComponent,
    DropdownSelectComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
