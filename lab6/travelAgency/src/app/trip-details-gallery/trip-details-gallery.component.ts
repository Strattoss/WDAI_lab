import { Component, Input } from '@angular/core';
import { ImgInfo } from 'src/assets/interfaces/imgInfo';

@Component({
  selector: 'app-trip-details-gallery',
  templateUrl: './trip-details-gallery.component.html',
  styleUrls: ['./trip-details-gallery.component.css']
})
export class TripDetailsGalleryComponent {
  @Input() imgs?: ImgInfo[];

  expandedImgInfo?: ImgInfo;
  showExpandedImg = false;

  expandImg(imgInfo: ImgInfo) {
    this.expandedImgInfo = imgInfo;
    this.showExpandedImg = true;
  }

  closeImg() { this.showExpandedImg = false; }

  getThumbnails() {
    let a = this.imgs?.map(val => val.srcThumbnail);
    return a != undefined ? a : new Array<string>();
  }
}
