import { HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CollectionService } from './collection.service';
import { Collection } from './collection';


describe('CollectionService', () => {
  let httpTestingController: HttpTestingController;
  let collectionService: CollectionService;
  let sampleCollection: Collection;

  //matches a GET request by url
  const requestMatcher: boolean = function(req: HttpRequest<any>, url: string) {
    return req.method === 'GET' && req.url === url;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CollectionService ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    collectionService = TestBed.get(CollectionService);

    sampleCollection = {
      id: 1,
      name: 'foo',
      yearMin: 1980,
      yearMax: 1989,
      itemCount: 100,
      isPublished: false,
      created: new Date(),
      modified: new Date(),
      featuredItemIdentifier: 'TEST-ID',
      donorId: 3,
      donorFirstName: 'arthur',
      donorLastName: 'dent'
    }
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should be created', () => {
    expect(collectionService).toBeTruthy();
  });

  it('Should return one Collection object', () => {
    const expected: Collection = sampleCollection;
    const fakeId: number = 42;

    collectionService.getCollection(fakeId).subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = CollectionService.READ_URL + '/' + fakeId;
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 
    req.flush(expected); 
  });

  it('Should return an array of Collection objects', () => {
    const expected: Collection[] = [ sampleCollection, sampleCollection ];

    //offset and limit don't matter in this test >> use undefined
    collectionService.getCollections(undefined, undefined).subscribe(
      data => expect(data.body).toEqual(expected),
      fail
    );

    const url = CollectionService.READ_URL;
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 
    req.flush(expected);
  });

  it('Should send correct parameters', () => {
    const expected: Collection[] = [ sampleCollection, sampleCollection ];

    const offset: number = 17;
    const limit: number = 42;

    collectionService.getCollections(offset, limit).subscribe(
      data => expect(data.body).toEqual(expected),
      fail
    );

    const url = CollectionService.READ_URL;
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 

    let expectedParams = new HttpParams();
    expectedParams = expectedParams.append('offset', String(offset));
    expectedParams = expectedParams.append('limit', String(limit));

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
      const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 

      const defaultOffset: number = 0;
      const defaultLimit: number = CollectionService.DEFAULT_PAGE_SIZE;

      let expectedParams = new HttpParams();
      expectedParams = expectedParams.append('offset', defaultOffset);
      expectedParams = expectedParams.append('limit', defaultLimit);

      expect(String(defaultOffset)).toEqual(req.request.params.get('offset'));
      expect(String(defaultLimit)).toEqual(req.request.params.get('limit'));

      req.flush(expected);
    });
});
