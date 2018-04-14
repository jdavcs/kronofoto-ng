import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorItemListComponent } from './donor-item-list.component';

describe('DonorItemListComponent', () => {
  let component: DonorItemListComponent;
  let fixture: ComponentFixture<DonorItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
