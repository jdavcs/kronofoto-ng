import { HttpRequest, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PageService } from './page.service';
import { Page } from './page';


describe('PageService', () => {
  let httpTestingController: HttpTestingController;
  let pageService: PageService;
  let samplePage: Page;

  //matches a GET request by url
  const requestMatcher = 
    function(req: HttpRequest<any>, url: string): boolean {
      return req.method === 'GET' && req.url === url;
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PageService ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    pageService = TestBed.get(PageService);

    samplePage = {
      id: 1,
      slug: 'a',
      title: 'b',
      body: 'c',
      created: new Date(),
      modified: new Date()
    }
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should be created', () => {
    expect(pageService).toBeTruthy();
  });
  it('Should return a page object', () => {
    const expected: Page = samplePage;
    const slug = 'foo';

    pageService.getPage(slug).subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = `${PageService.READ_URL}/${slug}`;
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 
    req.flush(expected);
  });
});
