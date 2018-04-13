import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemsModule } from './items/items.module';
import { CollectionsModule } from './collections/collections.module';

import { DonorListComponent } from './donor-list/donor-list.component';
import { DonorDetailComponent } from './donor-detail/donor-detail.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

import { PhotoService } from './photo.service';
import { CollectionService } from './model/collection.service';

import { FooComponent } from './foo.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    ItemsModule,
    CollectionsModule,
    AppRoutingModule
  ],
  declarations: [
    FooComponent,
    AppComponent,
    DonorListComponent,
    DonorDetailComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  providers: [PhotoService, CollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
