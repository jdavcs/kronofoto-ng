import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Collection } from './collection';

@Injectable()
export class CollectionService {
  static READ_URL: string = '/api/collections';
  static MAX_RECORDS: number = 100;
  static DEFAULT_PAGE_SIZE: number = 20;

  constructor(private http: HttpClient) { 
  }

  getCollection(id: number|string): Observable<Collection> {
    const url = CollectionService.READ_URL + '/' + id;
    return this.http.get<Collection>(url);
  }

  getCollections(
    offset: number = 0, 
    limit: number = CollectionService.DEFAULT_PAGE_SIZE
  ): Observable<Collection[]> {  

    let url = CollectionService.READ_URL;

    let params = new HttpParams();
    params = params.append('offset', String(offset));
    params = params.append('limit', String(limit));
    //add more params here

    return this.http.get<Collection[]>(url, {params});
  }
}

