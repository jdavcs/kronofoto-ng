import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Item } from './item';
import { ItemService } from './item.service';
import { environment } from '../../environments/environment';
import { YearSpanPipe } from '../year-span.pipe';
import { Pager } from '../pagination/pager';

@Component({
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  recordsGrid: Item[][];
  pager: Pager;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pager = this.initPager();

    this.route.queryParamMap
      .switchMap( (qParams: ParamMap) => {
        //get page/pagesize params and convert them to offset/limit
        this.pager.pageSize = 
          +qParams.get(environment.pagination.pageSizeParameter) || ItemService.DEFAULT_PAGE_SIZE;
        this.pager.pageNumber = +qParams.get(environment.pagination.pageNumberParameter) || 1;
        const offset: number = (this.pager.pageNumber - 1) * this.pager.pageSize;
        const limit: number = this.pager.pageSize;
        return this.itemService.getItems(offset, limit);
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
    const totalRecords: number = this.pager.lastRecord - this.pager.firstRecord + 1;
    const columns: number = environment.items.columns;
    const rows = Math.ceil(totalRecords / columns);
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
    this.router.navigate(['/items'], extras);
  }

  getImgSrc(item) {
    return environment.items.pathTo600 + 
      item.identifier + environment.items.imgSuffix;
  }

  //TODO move this to another location: can be used elsewhere!
  getYearDisplay(item) {
    if (item.yearMin === item.yearMax) {
      return String(item.yearMin);
    }
    else {
      return 'b';
      //return `circa ${item.yearMin}`; 
    }
  }
}
