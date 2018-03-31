import { Component } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  templateUrl: './item-list.component.html'
})
export class ItemListComponent {
  items;


  constructor(private photoService: PhotoService) {
    this.initItems();
  }

  private initItems()
  {
    this.photoService.getItems()
      .subscribe(data => this.items = data);
  }
}


