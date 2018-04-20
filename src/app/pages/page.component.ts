import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, NavigationExtras, ParamMap } from '@angular/router';

import { Page } from './page';
import { PageService } from './page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: Page;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap( (params: ParamMap) => {
        return this.pageService.getPage(params.get('slug'));
      })
      .subscribe( 
        data => { this.page = data; },
        error => { this.router.navigate(['/404']); }
      );
  }
}
