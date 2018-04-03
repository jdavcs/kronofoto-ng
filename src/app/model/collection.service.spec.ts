import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CollectionService } from './collection.service';
import { Collection } from './collection';


describe('CollectionService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let collectionService: CollectionService;
  let sampleCollection: Collection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CollectionService ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    collectionService = TestBed.get(CollectionService);

    sampleCollection = {
      id: 1,
      name: 'foo',
      year_min: 1980,
      year_max: 1989,
      item_count: 100,
      is_published: false,
      created: new Date(),
      modified: new Date(),
      featured_item_id: 2,
      donor_id: 3,
      donor_first_name: 'arthur',
      donor_last_name: 'dent'
    }
 
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(collectionService).toBeTruthy();
  });
  
  it('should return a Collection object (http GET/called once)', () => {
    const expected: Collection = sampleCollection;
    const fakeId = 42;

    collectionService.getCollection(fakeId).subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = CollectionService.readUrl + '/' + fakeId;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(expected);
  });
  
  it('should return an array of Collection objects (http GET/called once)', () => {
    const expected: Collection[] = [ sampleCollection, sampleCollection ];

    collectionService.getCollections().subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = CollectionService.readUrl;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(expected);
  });

  it('should be able to return an array of size 0 (http GET/called once)', () => {
    const expected: Collection[] = [];

    collectionService.getCollections().subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = CollectionService.readUrl;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(expected);
  });
});
