import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliverTopicService {
  displayer: any;
  constructor() { }

  reportTo(displayer: any) {
    this.displayer = displayer;
    console.log(typeof displayer);
  }

  displayFullContent(topic: string, fullContent: string) {
    this.displayer.display(topic, fullContent);
  }
}
