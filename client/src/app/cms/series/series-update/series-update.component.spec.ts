import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesUpdateComponent } from './series-update.component';

describe('SeriesUpdateComponent', () => {
  let component: SeriesUpdateComponent;
  let fixture: ComponentFixture<SeriesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
