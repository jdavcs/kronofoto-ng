import { HttpRequest, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ItemService } from './item.service';
import { Item } from './item';
import { ItemMetadata } from './item-metadata';


describe('ItemService', () => {
  let httpTestingController: HttpTestingController;
  let itemService: ItemService;
  let sampleItem: Item;
  let sampleItemMetadata: ItemMetadata;
  //
  //matches a GET request by url
  const requestMatcher = 
    function(req: HttpRequest<any>, url: string): boolean {
      return req.method === 'GET' && req.url === url;
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ItemService ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    itemService = TestBed.get(ItemService);

    sampleItem = {
      id: 1,
      identifier: 'test-item-id',
      collectionId: 42,
      latitude: 39.472768, 
      longitude: -106.102491,
      yearMin: 1990,
      yearMax: 1995,
      isPublished: true,
      created: new Date(),
      modified: new Date(),
    }

    sampleItemMetadata = {
      value: 'Enterprise',
      elementId: 1701,
      element: 'starship'
    }
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should be created', () => {
    expect(itemService).toBeTruthy();
  });


  it('Should return one Item object', () => {
    const expected: Item = sampleItem;
    const fakeId: number = 42;

    itemService.getItem(fakeId).subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = ItemService.READ_URL + '/' + fakeId;
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 
    req.flush(expected);
  });

  it('Should return an array of Item objects', () => {
    const expected: Item[] = [ sampleItem, sampleItem ];

    const fakeParam = 42;
    itemService.getItems(fakeParam, fakeParam).subscribe(
      data => expect(data.body).toEqual(expected),
      fail
    );

    const url = ItemService.READ_URL;
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 
    req.flush(expected);
  });


  it('Should send correct parameters', () => {
    const expected: Item[] = [ sampleItem, sampleItem ];

    const offset: number = 17;
    const limit: number = 42;

    itemService.getItems(offset, limit).subscribe(
      data => expect(data.body).toEqual(expected),
      fail
    );

    const url = ItemService.READ_URL;
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
      const expected: Item[] = [ sampleItem, sampleItem ];

      itemService.getItems().subscribe(
        data => expect(data.body).toEqual(expected),
        fail
      );

      const url = ItemService.READ_URL;
      const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 

      const defaultOffset: string = '0';
      const defaultLimit: string = String(ItemService.DEFAULT_PAGE_SIZE);

      let expectedParams = new HttpParams();
      expectedParams = expectedParams.append('offset', defaultOffset);
      expectedParams = expectedParams.append('limit', defaultLimit);
      expect(String(defaultOffset)).toEqual(req.request.params.get('offset'));
      expect(String(defaultLimit)).toEqual(req.request.params.get('limit'));
      req.flush(expected);
    });

  it('should return one random Item object', () => {
    const expected: Item = sampleItem;

    itemService.getRandomFeaturedItem().subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = ItemService.READ_URL + '/random';
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 
    req.flush(expected);
  });

  it('Should return an array of ItemMetadata objects', () => {

    const expected: ItemMetadata[] = [ sampleItemMetadata,  sampleItemMetadata ];
    const fakeId = 'xx';

    itemService.getItemMetadata(fakeId).subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = `${ItemService.READ_URL}/${fakeId}/metadata`;
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 
    req.flush(expected);
  });

  it('Should return an array of Item objects belonging to a collection', () => {
    const expected: Item[] = [ sampleItem, sampleItem ];
    const fakeId: number = 42;

    itemService.getCollectionItems(fakeId).subscribe(
      data => expect(data.body).toEqual(expected),
      fail
    );

    const url = '/api/items';
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 

    let expectedParams = new HttpParams();
    expectedParams = expectedParams.append('filter[collection]', String(fakeId));
    expect(String(fakeId)).toEqual(req.request.params.get('filter[collection]'));
    req.flush(expected);
  });
});
