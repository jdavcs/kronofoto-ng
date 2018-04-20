import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { PageComponent }      from './page.component';
import { PageService }        from './page.service';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [ PageComponent ],
  providers: [ PageService ]
})
export class PagesModule { }

