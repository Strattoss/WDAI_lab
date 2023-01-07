import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { Photo } from '../photo-interface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos?: Photo[];
  page = 0;
  maxPage = 0;
  span = 50;

  constructor(private getData: GetDataService, private router: Router) {}

  ngOnInit(): void {
    this.getData.getPhotos().subscribe(
      val => {
        this.photos = val;
        this.maxPage = val.length / this.span - 1;
      },
      err => this.photos = new Array<Photo>());
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

  showPhoto(photoId:number) {
    console.log(photoId);
    this.router.navigate([`/photo/${photoId}`])
  }

}
