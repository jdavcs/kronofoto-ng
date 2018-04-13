import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Collection } from '../model/collection';
import { CollectionService } from '../model/collection.service';

@Component({
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss']
})
export class CollectionDetailComponent implements OnInit {
  collection$: Observable<Collection>;

  constructor(
    private route: ActivatedRoute,
    private service: CollectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.collection$ = this.route.paramMap
      .switchMap( (params: ParamMap) => {
        const y = params.get('id');
        console.log(y);
        return this.service.getCollection(params.get('id')); 
      });
  }

  goToList() {
    this.router.navigate(['/collections', {foo: 42}], { queryParams: { page: 5 } });
  }


}
