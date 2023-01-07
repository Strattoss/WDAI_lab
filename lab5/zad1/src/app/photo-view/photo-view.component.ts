import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { Photo } from '../photo-interface';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.css']
})
export class PhotoViewComponent implements OnInit {
  photoId?: number;
  photo?: Photo;

  constructor(private activatedRoute: ActivatedRoute, private getData: GetDataService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      let id = paramMap.get('photoId');
      if (id != null) {
        this.photoId = Number.parseInt(id);
      }
    }
    )
    
    if (this.photoId) {
      this.getData.getPhotos().subscribe(res => this.photo = res.find(val => val.id == this.photoId))
    }
    
  }
}
