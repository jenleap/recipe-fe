import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextEditComponent } from './simple-text-edit.component';

describe('SimpleTextEditComponent', () => {
  let component: SimpleTextEditComponent;
  let fixture: ComponentFixture<SimpleTextEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTextEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTextEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
