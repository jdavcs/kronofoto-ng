import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import { PhotoService } from './photo.service';

import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}




describe('PhotoService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let photoService: PhotoService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    photoService = new PhotoService(<any> httpClientSpy);
  });

  it('should return expected items', () => {
    const expected: string[] = ['a', 'b', 'c'];
    httpClientSpy.get.and.returnValue(asyncData(expected));

    let x = photoService.getItems();
    photoService.getItems().subscribe(
      items => expect(items).toEqual(expected, 'my items'),
      fail
    );
    //expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });


  //beforeEach( () =>  { service = new PhotoService(); });
  //  beforeEach(() => {
  //    TestBed.configureTestingModule({
  //      providers: [PhotoService]
  //    });
  //  });
  //
  //  it('should be created', inject([PhotoService], (service: PhotoService) => {
  // expect(photoService).toBeTruthy();
  //}));
});
