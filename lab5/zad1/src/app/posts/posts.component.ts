import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Post } from '../post-interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts?: Post[];
  page = 0;
  maxPage = 0;
  span = 15;

  constructor(private getData: GetDataService) {}

  ngOnInit(): void {
    this.getData.getPosts().subscribe(val => {
      this.posts = val;
      this.maxPage = val.length / this.span - 1;
    }); 
  }

  nextPage() {
    if (this.page >= this.maxPage) {return;}
    this.page++;
  }

  prevPage()
  {
    if (this.page <= 0) {return;}
    this.page--;
  }
}
