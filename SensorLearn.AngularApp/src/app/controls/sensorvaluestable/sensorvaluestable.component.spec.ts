import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorvaluestableComponent } from './sensorvaluestable.component';

describe('SensorvaluestableComponent', () => {
  let component: SensorvaluestableComponent;
  let fixture: ComponentFixture<SensorvaluestableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorvaluestableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorvaluestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
