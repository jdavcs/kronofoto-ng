import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Collection } from './collection';
import { CollectionService } from './collection.service';
import { environment } from '../../environments/environment';
import { PaginationData } from '../pagination/pagination-data';

@Component({
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  records: Collection[][];
  pData: PaginationData;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap
      .switchMap( (qParams: ParamMap) => {
        const [pageNumber, pageSize] = this.getPagingParams(qParams);
        return this.collectionService.getCollections(pageNumber, pageSize);
      })
      .subscribe( data => {
        this.loadPaginationData(data.body['pagination']);
        this.displayData(data.body['results']);
      });
  }

  //TODO this should move to a superclass.
  getPagingParams(queryParams: ParamMap) {
    const pageNumber = +queryParams.get('page') || 1;
    const pageSize = +queryParams.get('pagesize');
    return Array(pageNumber, pageSize);
  }

  //TODO this should move to a superclass.
  loadPaginationData(data) {
    //TODO: add exception handling (there's no default values for total records)
    const totalRecords   = parseInt(data.count);
    const pageSize       = parseInt(data.pageSize);
    const totalPages     = parseInt(data.totalPages);
    const firstRecord    = parseInt(data.startIndex);
    const lastRecord     = parseInt(data.endIndex);
    const currPageNumber = parseInt(data.currentPage);
    const currPageSize   = lastRecord - firstRecord;

    this.pData = new PaginationData(
      totalRecords, pageSize, totalPages, firstRecord, lastRecord, currPageNumber, currPageSize);
  }

  //TODO this should move to a superclass.
  displayData(data) {
    const columns: number = environment.collections.columns;
    const rows = Math.ceil(this.pData.currentPageSize / columns);
    this.records = [];

    for (let i=0; i<rows; i++) {
      let cols = [];
      this.records.push(cols);
      for (let j=0; j<columns; j++) {
        let pos = (i * columns) + j;
        cols.push(data[pos]);
      }
    }
  }

  //TODO this should move to a superclass.
  goToPage(pageNum: number) {
    const extras: NavigationExtras = { queryParams: {page: pageNum, pagesize: this.pData.pageSize} };
    this.router.navigate(['/collections'], extras);
  }

  changePageSize(size: number) {
    const extras: NavigationExtras = { queryParams: {page: 1, pagesize: size } };
    this.router.navigate(['/collections'], extras);
  }

  getImgSrc(coll: Collection) {
    return environment.media.baseUrl + 
      environment.collections.pathToFeatured + 
      coll.featuredItemIdentifier + environment.collections.imgSuffix;
  }
}
