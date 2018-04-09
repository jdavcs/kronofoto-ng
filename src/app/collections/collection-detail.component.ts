import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { CollectionService } from '../model/collection.service';
import { Collection } from '../model/collection';

@Component({
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss']
})
export class CollectionDetailComponent implements OnInit {
  collection$: Observable<Collection>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CollectionService
  ) {}

  ngOnInit() {
    this.collection$ = this.route.paramMap
      .switchMap( (params: ParamMap) =>
        this.service.getCollection(params.get('id')) );
  }


}
