import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Page } from './page';
import { environment } from '../../environments/environment';

@Injectable()
export class PageService {
  static READ_URL: string = `${environment.api.urlPrefix}/api/page`;

  constructor(private http: HttpClient) {} 

  getPage(slug: string): Observable<Page> {
    const url = PageService.READ_URL + '/' + slug;
    return this.http.get<Page>(url);
  }
}
