import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorvaluesfilterComponent } from './sensorvaluesfilter.component';

describe('SensorvaluesfilterComponent', () => {
  let component: SensorvaluesfilterComponent;
  let fixture: ComponentFixture<SensorvaluesfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorvaluesfilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorvaluesfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
