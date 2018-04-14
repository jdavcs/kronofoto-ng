import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CollectionService } from './collections.service';
import { Collection } from './collection';


describe('CollectionService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let collectionService: CollectionService;
  let sampleCollection: Collection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CollectionService ]
    });

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
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
      featured_item_identifier: 'TEST-ID',
      donor_id: 3,
      donor_first_name: 'arthur',
      donor_last_name: 'dent'
    }
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(collectionService).toBeTruthy();
  });

  it('Should return one Collection object', () => {
    const expected: Collection = sampleCollection;
    const fakeId = 42;

    collectionService.getCollection(fakeId).subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = CollectionService.READ_URL + '/' + fakeId;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(expected);
  });

  it('Should return an array of Collection objects using parameters', () => {
    const expected: Collection[] = [ sampleCollection, sampleCollection ];

    const offset: number = 17;
    const limit: number = 42;
    const expectedSize: number = limit - offset;

    collectionService.getCollections(offset, limit).subscribe(
      data => expect(data.body).toEqual(expected),
      fail
    );

    const url = CollectionService.READ_URL;
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === url); 

    let expectedParams = new HttpParams();
    expectedParams = expectedParams.append('offset', String(offset));
    expectedParams = expectedParams.append('limit', String(limit));

    expect(String(expectedParams)).toEqual(String(req.request.params));
    expect(String(offset)).toEqual(req.request.params.get('offset'));
    expect(String(limit)).toEqual(req.request.params.get('limit'));

    req.flush(expected);
  });

  it('If no parameters supplied, should return an array of Collection objects ' +
    'using default parameters', () => {
      const expected: Collection[] = [ sampleCollection, sampleCollection ];

      collectionService.getCollections().subscribe(
        data => expect(data.body).toEqual(expected),
        fail
      );

      const url = CollectionService.READ_URL;
      const req = httpMock.expectOne(req => req.method === 'GET' && req.url === url); 

      //we won't use these as numbers
      const defaultOffset: string = '0';
      const defaultLimit: string = String(CollectionService.DEFAULT_PAGE_SIZE);

      let expectedParams = new HttpParams();
      expectedParams = expectedParams.append('offset', defaultOffset);
      expectedParams = expectedParams.append('limit', defaultLimit);

      expect(String(expectedParams)).toEqual(String(req.request.params));
      expect(defaultOffset).toEqual(req.request.params.get('offset'));
      expect(defaultLimit).toEqual(req.request.params.get('limit'));

      req.flush(expected);
    });
});

