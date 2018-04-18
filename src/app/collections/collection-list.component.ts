import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Collection } from './collection';
import { CollectionService } from './collection.service';
import { environment } from '../../environments/environment';
import { Pager } from '../pagination/pager';

@Component({
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  recordsGrid: Collection[][];
  pager: Pager;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pager = this.initPager();

    this.route.queryParamMap
      .switchMap( (qParams: ParamMap) => {
        //get page/pagesize params and convert them to offset/limit
        this.pager.pageSize = 
          +qParams.get(environment.pagination.pageSizeParameter) || CollectionService.DEFAULT_PAGE_SIZE;
        this.pager.pageNumber = +qParams.get(environment.pagination.pageNumberParameter) || 1;
        const offset: number = (this.pager.pageNumber - 1) * this.pager.pageSize;
        const limit: number = this.pager.pageSize;
        return this.collectionService.getCollections(offset, limit);
      })
      .subscribe( data => {
        this.loadHeaders(data.headers);
        this.displayData(data.body);
      });
  }

  initPager() {
    return {
      pageSize: -1,
      totalRecords: -1,
      firstRecord: -1,
      lastRecord: -1,
      totalPages: -1,
      pageNumber: -1
    };
  }

  loadHeaders(headers) {
    //TODO: add exception handling (there's no default values for total records)
    const totalRecords = parseInt(headers.get(environment.pagination.headers.totalRecords));
    const firstRecord  = parseInt(headers.get(environment.pagination.headers.firstRecord));
    const lastRecord   = parseInt(headers.get(environment.pagination.headers.lastRecord));
    const totalPages   = parseInt(headers.get(environment.pagination.headers.totalPages));

    this.pager.totalRecords = totalRecords;
    this.pager.firstRecord  = firstRecord;
    this.pager.lastRecord   = lastRecord;
    this.pager.totalPages   = totalPages;
  }

  displayData(records) {
    const displayedRecords: number = this.pager.lastRecord - this.pager.firstRecord + 1;
    const columns: number = environment.collections.columns;
    const rows = Math.ceil(displayedRecords / columns);
    this.recordsGrid = [];
    for (let i=0; i<rows; i++) {
      let cols = [];
      this.recordsGrid.push(cols);
      for (let j=0; j<columns; j++) {
        let pos = (i * columns) + j;
        cols.push(records[pos]);
      }
    }
  }

  goToPage(pageNum: number) {
    const extras: NavigationExtras = { queryParams: {page: pageNum, pagesize: this.pager.pageSize} };
    this.router.navigate(['/collections'], extras);
  }

  getImgSrc(coll: Collection) {
    return environment.collections.pathToFeatured + 
      coll.featuredItemIdentifier + environment.collections.imgSuffix;
  }
}
