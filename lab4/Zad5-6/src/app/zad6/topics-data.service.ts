import { Injectable } from '@angular/core';
import { Topics } from './mackup-topics-data';

@Injectable({
  providedIn: 'root'
})
export class TopicsDataService {

  constructor() { }

  getTopics() {
    return Promise.resolve(Topics);
  }
}
