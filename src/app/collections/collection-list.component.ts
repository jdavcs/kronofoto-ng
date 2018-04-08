import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CollectionService } from '../model/collection.service';
import { YearSpanPipe } from '../year-span.pipe';

@Component({
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent {
  readonly columns: number = 4;
  records;
  rows: number[]; //grid row indexes
  cols: number[]; //grid column indexes

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {
    this.initList();
  }

  initList() {

    //get parameters!
    const qParams = this.route.snapshot.queryParamMap;

    const offset: number = Number(qParams.get('offset')) || 0;
    const limit:  number = Number(qParams.get('limit')) || CollectionService.DEFAULT_PAGE_SIZE;

    //limit = limit ? parseInt(limit) : 0;

    console.log('offset ' + offset);
    console.log('limit ' + limit);

    
    //this.collectionService.getCollections(offset, limit)
    this.collectionService.getCollections(offset, limit)
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
    return "http://localhost/fortepan/featured/" + record['featured_item_identifier'] + "_f.jpg";
  }

  private getNumberOfRows(): number {
    const len = this.records.length;
    const remainder = len % this.columns;
    return Math.floor(len / this.columns) + Math.min(1, remainder);
  }

  private makeIndexArray(count): number[] {
    let a: number[] = [];
    for (let i=0; i<count; i++) {
      a.push(i);
    }
    return a;
  }
}
