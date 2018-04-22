import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Item } from './item';
import { ItemMetadata } from './item-metadata';
import { ItemService } from './item.service';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  metadata; //: Array<{number|string}>;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}


  ngOnInit() {

    const pubParams$ = this.route.paramMap.publish();

    pubParams$
      .switchMap( (params: ParamMap) => {
        return this.itemService.getItem(getIdentifier(params));
      })
      .subscribe( data => this.item = data );

    pubParams$
      .switchMap( (params: ParamMap) => {
        return this.itemService.getItemMetadata(getIdentifier(params));
      })
      .subscribe( data => this.loadMetadata(data) );

    pubParams$.connect();


    function getIdentifier(params: ParamMap): string { return params.get('identifier');}
  }

  loadMetadata(metadata: ItemMetadata[]) {
    this.metadata = Array();
    for (let record of metadata) {
      let key = record['element'];
      let value = record['value'];
      this.metadata[key] = value;
    }
  }

  getImgSrc(item) {
    return environment.items.pathTo700 + 
      item.identifier + '_x700' + environment.items.imgSuffix;
  }
}
