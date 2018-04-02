import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemsModule } from './items/items.module';

import { CollectionListComponent } from './collection-list/collection-list.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { DonorDetailComponent } from './donor-detail/donor-detail.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

import { PhotoService } from './photo.service';
import { CollectionService } from './collections/collection.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    ItemsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CollectionListComponent,
    DonorListComponent,
    CollectionDetailComponent,
    DonorDetailComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  providers: [PhotoService, CollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
