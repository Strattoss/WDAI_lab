import { Component, Input } from '@angular/core';
import { ImgInfo } from 'src/assets/interfaces/imgInfo';

@Component({
  selector: 'app-trip-details-gallery',
  templateUrl: './trip-details-gallery.component.html',
  styleUrls: ['./trip-details-gallery.component.css']
})
export class TripDetailsGalleryComponent {
  @Input() imgs?: ImgInfo[];

  expandedImgIndex: number | null = 0;

  expandImg(imgIndex: number) {
    this.expandedImgIndex = imgIndex;
  }

  closeImg() {
    this.expandedImgIndex = null;
  }

  getThumbnails() {
    let a = this.imgs?.map(val => val.srcThumbnail);
    return a != undefined ? a : new Array<string>();
  }

  nextImg() {
    if (this.expandedImgIndex === null || this.imgs === undefined || this.imgs.length == 0) { return; }
    if (this.expandedImgIndex == this.imgs.length - 1) {
      this.expandedImgIndex = 0;
    }
    else {
      this.expandedImgIndex++;
    }
  }

  prevImg() {
    if (this.expandedImgIndex === null || this.imgs === undefined || this.imgs.length == 0) { return; }
    if (this.expandedImgIndex == 0) {
      this.expandedImgIndex = this.imgs?.length - 1;
    }
    else {
      this.expandedImgIndex--;
    }
  }
}
