import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Page } from '../pages/page';
import { PageService } from '../pages/page.service';
import { Donor } from '../donors/donor';
import { DonorService } from './donor.service';

@Component({
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss']
})
export class DonorsComponent implements OnInit {
  page: Page;
  records: Donor[];

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private donorService: DonorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageService.getPage('contribute')
      .subscribe( 
        data => { this.page = data; },
        error => { this.router.navigate(['/404']); }
      );

    this.donorService.getAllDonors()
    .subscribe( data => this.records = data.body; );
  }
}
