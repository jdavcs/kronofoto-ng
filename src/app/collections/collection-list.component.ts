import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Collection } from '../model/collection';
import { CollectionService } from '../model/collection.service';
import { environment } from '../../environments/environment';
import { YearSpanPipe } from '../year-span.pipe';

@Component({
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  recordsGrid: Collection[][] = [];
  columns: number = 4;
  totalRecords: number;
  firstRecord: number;
  lastRecord: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap
      .switchMap( (qParams: ParamMap) => {
        //get page/pagesize params and convert them to offset/limit
        const pageNumber: number = Number(qParams.get('page')) || 0;
        const pageSize:  number = Number(qParams.get('pagesize')) || CollectionService.DEFAULT_PAGE_SIZE;
        const offset: number = (pageNumber - 1) * pageSize;
        const limit: number = pageSize;
        return this.collectionService.getCollections(offset, limit)
      })
      .subscribe( data => {
        this.loadHeaders(data.headers);
        this.displayData(data.body);
      });
  }

  loadHeaders(headers) {
    //TODO: add exception handling (there's no default values for total records)
    this.totalRecords = parseInt(headers.get(environment.pagination.headers.totalRecords));
    this.firstRecord  = parseInt(headers.get(environment.pagination.headers.firstRecord));
    this.lastRecord   = parseInt(headers.get(environment.pagination.headers.lastRecord));
    this.totalPages   = parseInt(headers.get(environment.pagination.headers.totalPages));
    this.pageSize     = parseInt(headers.get(environment.pagination.headers.pageSize));
    this.pageNumber   = parseInt(headers.get(environment.pagination.headers.pageNumber));
  }

  displayData(records) {
    const rows = Math.ceil(this.pageSize / this.columns);
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
    //TODO
    return ['/collections?offset=20'];
  }

  getImgSrc(coll) {
    return environment.collections.pathToFeatured + 
      coll.featured_item_identifier + environment.collections.imgSuffix;
  }
}
