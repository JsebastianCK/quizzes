import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaFormComponent } from './respuesta-form.component';

describe('RespuestaFormComponent', () => {
  let component: RespuestaFormComponent;
  let fixture: ComponentFixture<RespuestaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
