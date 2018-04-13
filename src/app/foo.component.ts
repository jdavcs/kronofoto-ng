import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-foo',
  template: `
  <button (click)= "publish($event)">emit event</button>
  <p *ngFor="let click of clicks; let i=index">
   {{i}}: {{click}}
  </p>
  `
})
export class FooComponent {
  clickEmitter: Observable<Event>;
  private clickSubject: Subject<Event> = new Subject();
  clicks: Array<Event> = [];

  constructor() {
    this.clickEmitter = this.clickSubject.asObservable(); //so can't call next() - i.e., no publishing.
    this.clickEmitter
      .subscribe(clickEvent => this.clicks.push(clickEvent));
  }

  publish(e:Event): void {
    this.clickSubject.next(e);
  }
}
