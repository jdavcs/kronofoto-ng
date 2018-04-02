import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Collection } from './collection';

@Injectable()
export class CollectionService {
  static readUrl: string = '/api/collections/';

  constructor(private http: HttpClient) { 
  }

  getCollection(id: number|string): Observable<Collection> {
    const url = CollectionService.readUrl + id;
    //<Collection> type parameter gets a typed return object.
    return this.http.get<Collection>(url);
  }

  getCollections(): Observable<Collection[]> {
    const url = CollectionService.readUrl;
    return this.http.get<Collection[]>(url);
  }
}
