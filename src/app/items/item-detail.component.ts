import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Item } from './item';
import { ItemService } from './item.service';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  item: Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}


  ngOnInit() {
    this.route.paramMap
      .switchMap( (params: ParamMap) => {
        const identifier = params.get('identifier');
        return this.itemService.getItem(identifier);
      })
      .subscribe( data => {
        console.log(data);
        this.item = data;
      });
  }

  getImgSrc(item) {
    return environment.items.pathTo700 + 
      item.identifier + '_x700' + environment.items.imgSuffix;
  }
}
