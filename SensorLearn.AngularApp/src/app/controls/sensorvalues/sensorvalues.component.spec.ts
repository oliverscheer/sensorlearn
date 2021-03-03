import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorvaluesComponent } from './sensorvalues.component';

describe('SensorvaluesComponent', () => {
  let component: SensorvaluesComponent;
  let fixture: ComponentFixture<SensorvaluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorvaluesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
