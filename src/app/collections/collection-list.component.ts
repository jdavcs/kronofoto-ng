import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CollectionService } from '../model/collection.service';
import { Collection } from '../model/collection';
import { YearSpanPipe } from '../year-span.pipe';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';

import { HttpParams, HttpResponse } from '@angular/common/http';


@Component({
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  readonly columns: number = 4;
  readonly imgSuffix: string = '_f.jpg';
  recordsGrid: Collection[][] = [];
  first: number;
  last: number;
  total: number;
  pageSize: number;

  foo$: Observable<Collection[]>;

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap
      .switchMap( (qParams: ParamMap) => {
        const offset: number = Number(qParams.get('offset')) || 0;
        const limit:  number = Number(qParams.get('limit')) || CollectionService.DEFAULT_PAGE_SIZE;
        return this.collectionService.getCollections(offset, limit)
      })
      .subscribe( data => this.processData(data) );
  }

  processData(data) {
    const records = data.body;
    const headers = data.headers;

    //get these from http headers. Must test this very carefully!
    //provide default values just in case
    ////also, get these from the env
    this.first = parseInt(headers.get('paging-first-record'));
    this.last =  parseInt(headers.get('paging-last-record'));
    this.total = parseInt(headers.get('paging-total-records'));
    this.pageSize = parseInt(headers.get('paging-page-size'));

    console.log(this.pageSize);
    console.log(this.getRowCount(this.pageSize));

    const rows = this.getRowCount(this.pageSize);
    for (let i=0; i<rows; i++) {
      let cols = [];
      this.recordsGrid.push(cols);
      for (let j=0; j<this.columns; j++) {
        let pos = (i * this.columns) + j;
        cols.push(records[pos]);
      }
    }
  }

  getNextLink(){
    return ['/collections?offset=20'];
  }

  private getRowCount(count): number {
    const remainder = count % this.columns;
    return Math.floor(count / this.columns) + Math.min(1, remainder);
  }

  getImgSrc(coll) {
    return environment.collections.pathToFeatured + coll.featured_item_identifier + this.imgSuffix;
  }
}
