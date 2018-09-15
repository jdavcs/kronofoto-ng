import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Collection } from './collection';
import { environment } from '../../environments/environment';

@Injectable()
export class CollectionService {
  static READ_URL: string = `${environment.api.urlPrefix}/api/collections`;
  static MAX_RECORDS: number = 100;
  static DEFAULT_PAGE_SIZE: number = 20;

  constructor(private http: HttpClient) {} 

  getCollection(id: number|string): Observable<Collection> {
    const url = CollectionService.READ_URL + '/' + id;
    return this.http.get<Collection>(url);
  }

  getItemCollection(identifier: string): Observable<Collection> {
    const url = `${environment.api.urlPrefix}/api/items/${identifier}/collection`;
    return this.http.get<Collection>(url);
  }

  getCollections(
    pageNumber: number = 1, 
    pageSize: number = CollectionService.DEFAULT_PAGE_SIZE
  ): Observable<HttpResponse<Collection[]>> {
    let url = CollectionService.READ_URL;

    let params = new HttpParams();
    params = params.append('page', String(pageNumber));
    params = params.append('pagesize', String(pageSize));
    //add more params here
    //
    return this.http.get<Collection[]>(url, {
      params: params,
      observe: 'response' //because we may need the headers returned by the API
    });
  }
}
