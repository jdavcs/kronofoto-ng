import { DebugElement } from '@angular/core';
import { By }  from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { CollectionListComponent } from './collection-list.component';
import { CollectionService } from '../model/collection.service';

describe('CollectionListComponent (minimal)', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(() => {
    const testData = {};
    const collectionServiceSpy = jasmine.createSpyObj('CollectionService', ['getCollections']); 
    collectionServiceSpy.getCollections.and.returnValue( of(testData) ); 

    TestBed.configureTestingModule({
      declarations: [ CollectionListComponent ],
      providers: [ {provide: CollectionService, useValue: collectionServiceSpy} ]
    });

    fixture = TestBed.createComponent(CollectionListComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });
});
