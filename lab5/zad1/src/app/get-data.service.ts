import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, find, map } from 'rxjs/operators';

import { Photo } from './photo-interface';
import { Post } from './post-interface';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>("https://jsonplaceholder.typicode.com/photos");
  }
}
