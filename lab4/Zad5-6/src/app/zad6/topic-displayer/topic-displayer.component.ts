import { Component, OnInit } from '@angular/core';
import { DeliverTopicService } from '../deliver-topic.service';

@Component({
  selector: 'app-topic-displayer',
  templateUrl: './topic-displayer.component.html',
  styleUrls: ['./topic-displayer.component.css']
})
export class TopicDisplayerComponent {
  topic = "";
  fullContent = "";

  constructor (public deliverTopicService: DeliverTopicService) {}

  ngOnInit() {
    this.deliverTopicService.reportTo(this);
  }

  display(topic:string, fullContent:string) {
    this.topic = topic;
    this.fullContent = fullContent;
  }
}
