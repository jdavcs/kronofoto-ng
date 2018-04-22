import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Collection } from '../collections/collection';
import { CollectionService } from '../collections/collection.service';
import { Item } from './item';
import { ItemMetadata } from './item-metadata';
import { ItemService } from './item.service';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  collection: Collection;
  item: Item;
  metadata; //: Array<{number|string}>;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
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

    pubParams$
      .switchMap( (params: ParamMap) => {
        return this.collectionService.getItemCollection(getIdentifier(params));
      })
      .subscribe( data => this.collection = data );

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

  getOriginalSrc() {
    return environment.items.pathToOriginal + 
      this.item.identifier + environment.items.imgSuffix;
  }

  getImgSrc() {
    return environment.items.pathTo700 + 
      this.item.identifier + '_x700' + environment.items.imgSuffix;
  }
}
