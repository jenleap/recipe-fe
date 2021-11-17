import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalToFractionComponent } from './decimal-to-fraction.component';

describe('DecimalToFractionComponent', () => {
  let component: DecimalToFractionComponent;
  let fixture: ComponentFixture<DecimalToFractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecimalToFractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecimalToFractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
