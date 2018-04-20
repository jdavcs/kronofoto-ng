import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './page.component';
import { PageNotFoundComponent } from '../pagenotfound.component';

const pageRoutes: Routes = [
  { path: '404', component: PageNotFoundComponent },
  { path: ':slug', component: PageComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(pageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}

