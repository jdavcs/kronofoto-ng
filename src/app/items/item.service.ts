import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Item } from './item';
import { ItemMetadata } from './item-metadata';

@Injectable()
export class ItemService {
  static READ_URL: string = '/api/items';
  static MAX_RECORDS: number = 100;
  static DEFAULT_PAGE_SIZE: number = 20;

  constructor(private http: HttpClient) {} 

  getItem(id: number|string): Observable<Item> {
    const url = ItemService.READ_URL + '/' + id;
    return this.http.get<Item>(url);
  }

  getItems(
    offset: number = 0, 
    limit: number = ItemService.DEFAULT_PAGE_SIZE
  ): Observable<HttpResponse<Item[]>> {
    let url = ItemService.READ_URL;

    let params = new HttpParams();
    params = params.append('offset', String(offset));
    params = params.append('limit', String(limit));
    //add more params here

    return this.http.get<Item[]>(url, {
      params: params,
      observe: 'response' //because we need the headers returned by the API
    });
  }

  getItemMetadata(identifier: string): Observable<ItemMetadata[]> {
    const url = ItemService.READ_URL + '/' + identifier + '/metadata';
    return this.http.get<ItemMetadata[]>(url);
  }

  //refactor this
  getCollectionItems(
    offset: number = 0, 
    limit: number = ItemService.DEFAULT_PAGE_SIZE,
    collId: number
  ): Observable<HttpResponse<Item[]>> {
    let url = ItemService.READ_URL;

    let params = new HttpParams();
    params = params.append('offset', String(offset));
    params = params.append('limit', String(limit));

    //dosesn't work
    params = params.append('filter[collection]', String(collId));

    //TODO remove this later
    params = params.append('sort', 'yearMin');

    return this.http.get<Item[]>(url, {
      params: params,
      observe: 'response' //because we need the headers returned by the API
    });


  }
}
