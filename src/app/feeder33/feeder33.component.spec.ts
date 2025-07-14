import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feeder33Component } from './feeder33.component';

describe('Feeder33Component', () => {
  let component: Feeder33Component;
  let fixture: ComponentFixture<Feeder33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Feeder33Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feeder33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
