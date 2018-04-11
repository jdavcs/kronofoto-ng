import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CollectionService } from '../model/collection.service';
import { Collection } from '../model/collection';
import { YearSpanPipe } from '../year-span.pipe';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent {
  readonly columns: number = 4;
  readonly imgSuffix: string = '_f.jpg';
  recordsGrid: Collection[][] = [];
  first: number;
  last: number;
  total: number;

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {
    this.loadData();
  }

  loadData() {

    // TODO change to observable
    const qParams = this.route.snapshot.queryParamMap;
    const offset: number = Number(qParams.get('offset')) || 0;
    const limit:  number = Number(qParams.get('limit')) || CollectionService.DEFAULT_PAGE_SIZE;

    this.collectionService.getCollections(offset, limit)
      .subscribe(data => {

        const records = data.body;
        const headers = data.headers;

        //get these from http headers. Must test this very carefully!
        this.first = parseInt(headers.get('paging-first-record'));
        this.last =  parseInt(headers.get('paging-last-record'));
        this.total = parseInt(headers.get('paging-total-records'));



        console.log(headers.keys());
        console.log(headers.get('paging-first-record'));


        const rows = 5;
        for (let i=0; i<rows; i++) {
          let cols = [];
          this.recordsGrid.push(cols);
          for (let j=0; j<this.columns; j++) {
            let pos = (i * this.columns) + j;
            cols.push(records[pos]);
          }
        }

      });
  }

  private getRowCount(count): number {
    const remainder = count % this.columns;
    return Math.floor(count / this.columns) + Math.min(1, remainder);
  }

  getImgSrc(coll) {
    return environment.collections.pathToFeatured + coll.featured_item_identifier + this.imgSuffix;
  }
}
