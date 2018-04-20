import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Page } from './page';

@Injectable()
export class PageService {
  static READ_URL: string = '/api/page';

  constructor(private http: HttpClient) {} 

  getPage(slug: string): Observable<Page> {
    const url = PageService.READ_URL + '/' + slug;
    return this.http.get<Page>(url);
  }
}
