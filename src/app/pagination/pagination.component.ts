import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Pager } from './pager';

@Component({
  selector: 'fi-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pager: Pager;
  @Output() pageRequest = new EventEmitter<number>();

  ngOnInit() {}
 
  firstPage() {
    this.pageRequest.emit(1);
  }

  prevPage() {
    const page: number = Math.max(1, this.pager.pageNumber - 1);
    this.pageRequest.emit(page);
  }

  nextPage() {
    const page: number = Math.min(this.pager.totalPages, this.pager.pageNumber + 1);
    this.pageRequest.emit(page);
  }

  lastPage() {
    this.pageRequest.emit(this.pager.totalPages);
  }
}
