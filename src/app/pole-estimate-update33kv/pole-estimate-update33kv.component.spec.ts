import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleEstimateUpdate33kvComponent } from './pole-estimate-update33kv.component';

describe('PoleEstimateUpdate33kvComponent', () => {
  let component: PoleEstimateUpdate33kvComponent;
  let fixture: ComponentFixture<PoleEstimateUpdate33kvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoleEstimateUpdate33kvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoleEstimateUpdate33kvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
