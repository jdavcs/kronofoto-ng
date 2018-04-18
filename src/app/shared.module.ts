import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { YearSpanPipe } from './year-span.pipe';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ 
    YearSpanPipe,
    PaginationComponent
  ],
  exports: [ 
    YearSpanPipe,
    PaginationComponent
  ]
})
export class SharedModule { }
