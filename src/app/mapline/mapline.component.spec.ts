import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaplineComponent } from './mapline.component';

describe('MaplineComponent', () => {
  let component: MaplineComponent;
  let fixture: ComponentFixture<MaplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaplineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
