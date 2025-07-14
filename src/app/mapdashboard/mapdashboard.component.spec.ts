import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapdashboardComponent } from './mapdashboard.component';

describe('MapdashboardComponent', () => {
  let component: MapdashboardComponent;
  let fixture: ComponentFixture<MapdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
