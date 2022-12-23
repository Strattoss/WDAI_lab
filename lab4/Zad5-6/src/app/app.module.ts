import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SelectYourCarComponent } from './zad5/select-your-car/select-your-car.component';
import { TopicComponent } from './zad6/topic/topic.component';
import { TopicDisplayerComponent } from './zad6/topic-displayer/topic-displayer.component';
import { Zad6Component } from './zad6/zad6.component';


@NgModule({
  declarations: [
    AppComponent,
    SelectYourCarComponent,
    TopicComponent,
    TopicDisplayerComponent,
    Zad6Component,

  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
