import { Component } from '@angular/core';
import { CollectionService } from '../model/collection.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent {
  records;

  constructor(private collectionService: CollectionService) {
    this.initList();
  }

  initList() {
    this.collectionService.getCollections()
     .subscribe(data => this.records = data);
  }
}
