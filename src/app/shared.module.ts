import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileSizePipe } from './file-size.pipe';
import { YearSpanPipe } from './year-span.pipe';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ 
    FileSizePipe,
    YearSpanPipe,
    PaginationComponent
  ],
  exports: [ 
    FileSizePipe,
    YearSpanPipe,
    PaginationComponent
  ]
})
export class SharedModule { }
