import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
  private currentId;

  constructor() { 
    this.currentId = 0;
  }

  getPhotos() {
    const prev = this.currentId;
    const curr = (this.currentId + 1) % 10;
    const next = (curr + 1) % 10;

    this.currentId = curr;

    return {
      'prev': prev + '.jpg',
      'curr': curr + '.jpg',
      'next': next + '.jpg'
    };
  }
}
