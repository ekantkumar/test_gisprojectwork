import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbdataComponent } from './embdata.component';

describe('EmbdataComponent', () => {
  let component: EmbdataComponent;
  let fixture: ComponentFixture<EmbdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
