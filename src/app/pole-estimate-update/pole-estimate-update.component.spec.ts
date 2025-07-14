import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleEstimateUpdateComponent } from './pole-estimate-update.component';

describe('PoleEstimateUpdateComponent', () => {
  let component: PoleEstimateUpdateComponent;
  let fixture: ComponentFixture<PoleEstimateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoleEstimateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoleEstimateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
