import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ItemService } from './item.service';
import { Item} from './item';


describe('ItemService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let itemService: ItemService;
  let sampleItem: Item;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ItemService ]
    });

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
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
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should be created', () => {
    expect(itemService).toBeTruthy();
  });

  it('Should return one Item object', () => {
    const expected: Item = sampleItem;
    const fakeId = 42;

    itemService.getItem(fakeId).subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = ItemService.READ_URL + '/' + fakeId;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(expected);
  });

  it('Should return an array of Item objects using parameters', () => {
    const expected: Item[] = [ sampleItem, sampleItem ];

    const offset: number = 10;
    const limit: number = 25;

    itemService.getItems(offset, limit).subscribe(
      data => expect(data.body).toEqual(expected),
      fail
    );

    const url = ItemService.READ_URL;
    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === url); 

    let expectedParams = new HttpParams();
    expectedParams = expectedParams.append('offset', String(offset));
    expectedParams = expectedParams.append('limit', String(limit));

    expect(String(expectedParams)).toEqual(String(req.request.params));
    expect(String(offset)).toEqual(req.request.params.get('offset'));
    expect(String(limit)).toEqual(req.request.params.get('limit'));

    req.flush(expected);
  });

  it('If no parameters supplied, should return an array of Item objects ' +
    'using default parameters', () => {
      const expected: Item[] = [ sampleItem, sampleItem ];

      itemService.getItems().subscribe(
        data => expect(data.body).toEqual(expected),
        fail
      );

      const url = ItemService.READ_URL;
      const req = httpMock.expectOne(req => req.method === 'GET' && req.url === url); 

      //we won't use these as numbers
      const defaultOffset: string = '0';
      const defaultLimit: string = String(ItemService.DEFAULT_PAGE_SIZE);

      let expectedParams = new HttpParams();
      expectedParams = expectedParams.append('offset', defaultOffset);
      expectedParams = expectedParams.append('limit', defaultLimit);

      expect(String(expectedParams)).toEqual(String(req.request.params));
      expect(defaultOffset).toEqual(req.request.params.get('offset'));
      expect(defaultLimit).toEqual(req.request.params.get('limit'));

      req.flush(expected);
    });
});



