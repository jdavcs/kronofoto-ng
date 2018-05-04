import { HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DonorService } from './donor.service';
import { Donor } from './donor';


describe('DonorService', () => {
  let httpTestingController: HttpTestingController;
  let donorService: DonorService;
  let sampleDonor: Donor;

  //matches a GET request by url
  const requestMatcher: boolean = function(req: HttpRequest<any>, url: string) {
    return req.method === 'GET' && req.url === url;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DonorService ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    donorService = TestBed.get(DonorService);

    sampleDonor = {
      id: 1,
      firstName: 'ford',
      lastName: 'prefect',
      itemCount: 42,
      collectionCount: 9,
      created: new Date(),
      modified: new Date()
    }
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should be created', () => {
    expect(donorService).toBeTruthy();
  });
  it('Should return an array of Donor objects', () => {
    const expected: Donor[] = [ sampleDonor,  sampleDonor ];

    donorService.getAllDonors().subscribe(
      data => expect(data).toEqual(expected),
      fail
    );

    const url = DonorService.READ_URL;
    const req = httpTestingController.expectOne(r => requestMatcher(r, url)); 
    req.flush(expected);
  });
});
