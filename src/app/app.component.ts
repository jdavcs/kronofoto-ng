import { Component } from '@angular/core';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  prevPhotoUrl: string;
  currentPhotoUrl: string;
  nextPhotoUrl: string;
  private photoPath = "/assets/tmp-archive/";

  constructor(private photoService: PhotoService) {
    this.initPhotos();
  }

  private initPhotos() {
    this.prevPhotoUrl = this.photoPath + "9.jpg";
    this.currentPhotoUrl = this.photoPath + "0.jpg";
    this.nextPhotoUrl = this.photoPath + "1.jpg";
  }

  setPrevPhoto() {
    return {'background-image': 'url(' + this.prevPhotoUrl};
  }

  setNextPhoto() {
    return {'background-image': 'url(' + this.nextPhotoUrl};
  }

  clickedRight(): void {
    const photos = this.getPhotos();
  }

  getPhotos(): void {
    const photos = this.photoService.getPhotos();
    this.prevPhotoUrl = this.photoPath + photos['prev'];
    this.currentPhotoUrl = this.photoPath + photos['curr'];
    this.nextPhotoUrl = this.photoPath + photos['next'];
  }
}
