import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoService {
  private currentId;

  constructor(private http: HttpClient) { 
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


  //geet this from your api
  getItems() {
    const url: string = 'http://localhost:8001/items?sort=year_min&filter[before]=1900&limit=50';

    return this.http.get(url);
  }
}
