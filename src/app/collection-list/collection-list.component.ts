import { Component } from '@angular/core';
import { CollectionService } from '../model/collection.service';
import { FooDirective } from '../foo.directive';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent {
  readonly columns: number = 4;
  records;
  rows: number[]; //grid row indexes
  cols: number[]; //grid column indexes

  constructor(private collectionService: CollectionService) {
    this.initList();
  }

  initList() {
    this.collectionService.getCollections()
      .subscribe(data => {
        this.records = data;
        this.cols = this.makeIndexArray(this.columns);
        this.rows = this.makeIndexArray(this.getNumberOfRows());
      });
  }

  getRecord(row, col) {
    return this.records[row * this.columns + col];
  }

  getImageSrc(row, col) {
    const record = this.getRecord(row, col);
    return "http://localhost/fortepan/h700/" + record['featured_item_identifier'] + "_x700.jpg";
  }

  private getNumberOfRows(): number {
    const len = this.records.length;
    const remainder = len % this.columns;
    return parseInt(len / this.columns) + Math.min(1, remainder);
  }

  private makeIndexArray(count): number[] {
    let a: number[] = [];
    for (let i=0; i<count; i++) {
      a.push(i);
    }
    return a;
  }
}
