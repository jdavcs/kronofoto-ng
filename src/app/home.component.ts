import { Component, OnInit } from '@angular/core';

import { Item } from './items/item';
import { ItemService } from './items/item.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  item: Item;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getRandomFeaturedItem()
      .subscribe( data => this.item = data );
  }
 
  getImgSrc() {
    return environment.media.baseUrl + environment.items.pathTo700 + this.item.identifier + 
      '_x700' + environment.items.imgSuffix;
  }
}
