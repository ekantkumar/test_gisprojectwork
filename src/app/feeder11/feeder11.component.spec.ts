import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feeder11Component } from './feeder11.component';

describe('Feeder11Component', () => {
  let component: Feeder11Component;
  let fixture: ComponentFixture<Feeder11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Feeder11Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feeder11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
