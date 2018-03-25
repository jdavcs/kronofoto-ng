import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ItemListComponent } from './item-list/item-list.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { DonorDetailComponent } from './donor-detail/donor-detail.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

import { PhotoService } from './photo.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    CollectionListComponent,
    DonorListComponent,
    ItemDetailComponent,
    CollectionDetailComponent,
    DonorDetailComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
