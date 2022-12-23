import { Component, Input } from '@angular/core';
import { DeliverTopicService } from '../deliver-topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {
  @Input() topic: string = "";
  @Input() content: string = "";
  @Input() fullContent: string = "";

  constructor(public deliverTopicService: DeliverTopicService) {}

  displayFullContent() {
    this.deliverTopicService.displayFullContent(this.topic, this.fullContent);
  }
}
