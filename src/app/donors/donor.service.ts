import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Donor } from './donor';

@Injectable()
export class DonorService {
  static READ_URL: string = '/api/alldonors';
  static MAX_RECORDS: number = 1000; //1000: not a typo: this will be just a list
  static DEFAULT_PAGE_SIZE: number = 1000;

  constructor(private http: HttpClient) {} 

  getAllDonors(
    offset: number = 0, 
    limit: number = DonorService.DEFAULT_PAGE_SIZE
  ): Observable<HttpResponse<Donor[]>> {
    let url = DonorService.READ_URL;

    let params = new HttpParams();
    params = params.append('sort', 'firstName');

    return this.http.get<Donor[]>(url, {
      params: params,
      observe: 'response' //because we need the headers returned by the API
    });
  }
}

