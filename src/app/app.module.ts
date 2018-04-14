import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule }         from '@angular/core';

import { AppRoutingModule }  from './app-routing.module';
import { CollectionsModule } from './collections/collections.module';
import { DonorsModule }      from './donors/donors.module';
import { ItemsModule }       from './items/items.module';
import { PagesModule }       from './pages/pages.module';

import { AppComponent }          from './app.component';
import { HomeComponent }     from './home.component';
import { PageNotFoundComponent } from './pagenotfound.component';

import { CollectionService } from './model/collection.service'; //TODO  rename this to collection-data.service
import { PhotoService } from './photo.service'; //TODO remove this

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    CollectionsModule,
    DonorsModule,
    ItemsModule,
    PagesModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    PageNotFoundComponent 
  ],
  providers: [ CollectionService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
