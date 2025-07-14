import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaplineapiComponent } from './maplineapi.component';

describe('MaplineapiComponent', () => {
  let component: MaplineapiComponent;
  let fixture: ComponentFixture<MaplineapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaplineapiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaplineapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
