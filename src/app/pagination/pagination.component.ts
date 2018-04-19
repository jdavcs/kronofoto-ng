import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { PaginationData } from './pagination-data';

@Component({
  selector: 'fi-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() data: PaginationData;
  @Output() pageRequest = new EventEmitter<number>();

  ngOnInit() {}

  firstPage() {
    this.pageRequest.emit(1);
  }

  prevPage() {
    if (this.data.currentPageNumber > 1) {
      const page: number = Math.max(1, this.data.currentPageNumber - 1);
      this.pageRequest.emit(page);
    }
  }

  nextPage() {
    if (this.data.currentPageNumber < this.data.totalPages) {
      const page: number = Math.min(this.data.totalPages, this.data.currentPageNumber + 1);
      this.pageRequest.emit(page);
    }
  }

  lastPage() {
    this.pageRequest.emit(this.data.totalPages);
  }
}
