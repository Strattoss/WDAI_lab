import { Component, OnInit } from '@angular/core';
import { TopicsDataService } from './topics-data.service';
import { Topic } from './topic';

@Component({
  selector: 'app-zad6',
  templateUrl: './zad6.component.html',
  styleUrls: ['./zad6.component.css']
})
export class Zad6Component {
  topics?: Topic[];

  constructor (public topicsDataService: TopicsDataService) {}

  ngOnInit() {
    this.topicsDataService.getTopics().then(res => this.topics = res);
  }

}
