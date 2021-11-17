import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServingsConfirmComponent } from './servings-confirm.component';

describe('ServingsConfirmComponent', () => {
  let component: ServingsConfirmComponent;
  let fixture: ComponentFixture<ServingsConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServingsConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServingsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
