import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionItemListComponent } from './collection-item-list.component';

describe('CollectionItemListComponent', () => {
  let component: CollectionItemListComponent;
  let fixture: ComponentFixture<CollectionItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
