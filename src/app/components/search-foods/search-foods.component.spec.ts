import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodsComponent } from './search-foods.component';

describe('SearchFoodsComponent', () => {
  let component: SearchFoodsComponent;
  let fixture: ComponentFixture<SearchFoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
