import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { YearSpanPipe } from './year-span.pipe';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ YearSpanPipe ],
  exports: [ YearSpanPipe]
})
export class SharedModule { }
