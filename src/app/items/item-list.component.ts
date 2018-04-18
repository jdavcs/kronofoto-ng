import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Item } from './item';
import { ItemService } from './item.service';
import { environment } from '../../environments/environment';
import { YearSpanPipe } from '../year-span.pipe';

@Component({
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  recordsGrid: Item[][];
  pageSize: number; 
  totalRecords: number;
  firstRecord: number;
  lastRecord: number;
  totalPages: number;
  pageNumber: number;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap
      .switchMap( (qParams: ParamMap) => {
        //get page/pagesize params and convert them to offset/limit
        this.pageSize = 
          +qParams.get(environment.pagination.pageSizeParameter) || ItemService.DEFAULT_PAGE_SIZE;
        this.pageNumber = +qParams.get(environment.pagination.pageNumberParameter) || 1;
        const offset: number = (this.pageNumber - 1) * this.pageSize;
        const limit: number = this.pageSize;
        return this.itemService.getItems(offset, limit);
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
  }

  displayData(records) {
    const totalRecords: number = this.lastRecord - this.firstRecord + 1;
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
 
  firstPage() {
    this.goToPage(1); 
  }

  prevPage() {
    const pageNum: number = Math.max(1, this.pageNumber - 1);
    this.goToPage(pageNum); 
  }

  nextPage() {
    const pageNum: number = Math.min(this.totalPages, this.pageNumber + 1);
    this.goToPage(pageNum); 
  }

  lastPage() {
    this.goToPage(this.totalPages); 
  }

  goToPage(pageNum) {
    const extras: NavigationExtras = { queryParams: {page: pageNum, pagesize: this.pageSize} };
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
